"""
Создание заявки от клиента: сохраняет клиента и бронирование в БД,
возвращает ссылку на оплату через ЮКасса.
"""
import json
import os
import uuid
import psycopg2
import urllib.request
import base64

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

SERVICE_PRICES = {
    "manicure": 150000,
    "pedicure": 180000,
    "nails": 250000,
    "design": 50000,
}

SERVICE_NAMES = {
    "manicure": "Маникюр + гель-лак",
    "pedicure": "Педикюр + гель-лак",
    "nails": "Наращивание ногтей",
    "design": "Дизайн ногтей",
}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    service = body.get("service", "").strip()
    return_url = body.get("return_url", "https://example.com")

    if not name or not phone or not service:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "Заполните все поля"}),
        }

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        f"INSERT INTO {schema}.clients (name, phone) VALUES (%s, %s) RETURNING id",
        (name, phone),
    )
    client_id = cur.fetchone()[0]

    price = SERVICE_PRICES.get(service, 100000)
    service_name = SERVICE_NAMES.get(service, service)

    cur.execute(
        f"""
        INSERT INTO {schema}.bookings (client_id, service, price_amount, status, payment_status)
        VALUES (%s, %s, %s, 'new', 'pending') RETURNING id
        """,
        (client_id, service_name, price),
    )
    booking_id = cur.fetchone()[0]
    conn.commit()

    shop_id = os.environ.get("YOOKASSA_SHOP_ID", "")
    secret_key = os.environ.get("YOOKASSA_SECRET_KEY", "")

    if shop_id and secret_key:
        idempotence_key = str(uuid.uuid4())
        payment_payload = {
            "amount": {"value": f"{price / 100:.2f}", "currency": "RUB"},
            "confirmation": {"type": "redirect", "return_url": return_url},
            "description": f"{service_name} — {name} ({phone})",
            "metadata": {"booking_id": booking_id, "client_id": client_id},
            "capture": True,
        }
        credentials = base64.b64encode(f"{shop_id}:{secret_key}".encode()).decode()
        req = urllib.request.Request(
            "https://api.yookassa.ru/v3/payments",
            data=json.dumps(payment_payload).encode(),
            headers={
                "Authorization": f"Basic {credentials}",
                "Content-Type": "application/json",
                "Idempotence-Key": idempotence_key,
            },
            method="POST",
        )
        with urllib.request.urlopen(req) as resp:
            payment = json.loads(resp.read())

        payment_id = payment["id"]
        confirmation_url = payment["confirmation"]["confirmation_url"]

        cur2 = conn.cursor()
        cur2.execute(
            f"UPDATE {schema}.bookings SET payment_id = %s WHERE id = %s",
            (payment_id, booking_id),
        )
        conn.commit()
        cur2.close()
        cur.close()
        conn.close()

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "booking_id": booking_id,
                "payment_url": confirmation_url,
            }),
        }

    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({
            "booking_id": booking_id,
            "payment_url": None,
            "message": "Заявка принята, оплата не настроена",
        }),
    }
