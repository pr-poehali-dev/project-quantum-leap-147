import { useState } from "react"
import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"
import func2url from "../../backend/func2url.json"

const portfolioItems = [
  { id: 1, label: "Французский маникюр", sub: "Классика", gradient: "from-rose-100 to-pink-50" },
  { id: 2, label: "Гель-лак с дизайном", sub: "Арт", gradient: "from-fuchsia-200 to-rose-100" },
  { id: 3, label: "Наращивание", sub: "Объём", gradient: "from-pink-200 to-fuchsia-100" },
  { id: 4, label: "Педикюр", sub: "Уход", gradient: "from-red-100 to-rose-50" },
  { id: 5, label: "Омбре градиент", sub: "Переход", gradient: "from-purple-100 to-pink-100" },
  { id: 6, label: "Арт-дизайн", sub: "Эксклюзив", gradient: "from-rose-200 to-pink-100" },
]

const prices = [
  {
    category: "Маникюр",
    items: [
      { service: "Классический маникюр", price: "от 800 ₽" },
      { service: "Маникюр + гель-лак", price: "от 1 500 ₽" },
      { service: "Наращивание ногтей", price: "от 2 500 ₽" },
      { service: "Коррекция наращивания", price: "от 1 800 ₽" },
    ],
  },
  {
    category: "Педикюр",
    items: [
      { service: "Классический педикюр", price: "от 1 200 ₽" },
      { service: "Педикюр + гель-лак", price: "от 1 800 ₽" },
      { service: "Аппаратный педикюр", price: "от 2 000 ₽" },
      { service: "Снятие покрытия", price: "от 300 ₽" },
    ],
  },
]

const schedule = [
  { day: "Пн — Чт", time: "10:00 – 19:00", active: true },
  { day: "Пт — Сб", time: "10:00 – 20:00", active: true },
  { day: "Воскресенье", time: "Выходной", active: false },
]

type FormState = "idle" | "loading" | "success" | "error"

const SectionLabel = ({ text }: { text: string }) => (
  <span className="text-pink-500/60 text-[10px] uppercase tracking-[0.2em] font-medium">{text}</span>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-5xl font-light text-white mt-2 mb-12 leading-none">{children}</h2>
)

const Index = () => {
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formService, setFormService] = useState("")
  const [formState, setFormState] = useState<FormState>("idle")
  const [formError, setFormError] = useState("")

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formPhone || !formService) {
      setFormError("Пожалуйста, заполните все поля")
      return
    }
    setFormState("loading")
    setFormError("")
    try {
      const res = await fetch(func2url.booking, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          service: formService,
          return_url: window.location.href + "?booking=success",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Ошибка сервера")
      if (data.payment_url) {
        window.location.href = data.payment_url
      } else {
        setFormState("success")
      }
    } catch (err: unknown) {
      setFormState("error")
      setFormError(err instanceof Error ? err.message : "Произошла ошибка")
    }
  }

  return (
    <div className="bg-[#0d0008]">
      <ShaderBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
      </ShaderBackground>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel text="Примеры работ" />
              <h2 className="font-display text-5xl font-light text-white mt-2 leading-none">Портфолио</h2>
            </div>
            <p className="text-white/25 text-xs max-w-[180px] text-right leading-relaxed hidden md:block">
              Каждая работа — забота о деталях
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {portfolioItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <div className={`w-full aspect-[4/5] bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0.5 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white/40 text-[9px] uppercase tracking-widest mb-0.5">{item.sub}</div>
                  <div className="text-white text-sm font-light">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SectionLabel text="Стоимость услуг" />
          <SectionTitle>Прайс-лист</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12">
            {prices.map((group, gi) => (
              <div key={gi}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-pink-500/50 rounded-full" />
                  <span className="text-white/40 text-xs uppercase tracking-widest">{group.category}</span>
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-4 px-4 rounded-xl hover:bg-white/4 transition-colors duration-200 group/row"
                    >
                      <span className="text-white/65 text-sm font-light group-hover/row:text-white/90 transition-colors">{item.service}</span>
                      <span className="text-pink-300/70 text-sm font-light">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-white/20 text-[11px]">точную стоимость уточняйте при записи</p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>
      </section>

      {/* Schedule + Booking */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Schedule */}
          <div id="schedule">
            <SectionLabel text="Часы работы" />
            <SectionTitle>График</SectionTitle>
            <div className="space-y-1">
              {schedule.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center py-4 px-4 rounded-xl transition-colors ${item.active ? "hover:bg-white/4" : "opacity-30"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-pink-400" : "bg-white/20"}`} />
                    <span className="text-white/70 text-sm font-light">{item.day}</span>
                  </div>
                  <span className={`text-sm font-light ${item.active ? "text-pink-300/80" : "text-white/30"}`}>{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-white/3 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="MapPin" size={12} className="text-pink-400/50" />
                <span className="text-white/25 text-[10px] uppercase tracking-widest">Адрес</span>
              </div>
              <p className="text-white/50 text-sm font-light">Укажите адрес вашей студии</p>
            </div>
          </div>

          {/* Booking */}
          <div id="booking">
            <SectionLabel text="Онлайн-запись" />
            <SectionTitle>Запись</SectionTitle>

            <a
              href="tel:+79991234567"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/25 transition-colors">
                <Icon name="Phone" size={16} className="text-pink-300" />
              </div>
              <div>
                <div className="text-white/25 text-[10px] uppercase tracking-widest mb-0.5">Позвонить</div>
                <div className="text-white text-base font-light group-hover:text-pink-100 transition-colors">+7 (999) 123-45-67</div>
              </div>
              <Icon name="ArrowUpRight" size={14} className="text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
            </a>

            {formState === "success" ? (
              <div className="p-8 rounded-2xl border border-pink-400/20 bg-pink-950/20 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Icon name="Check" size={22} className="text-pink-300" />
                </div>
                <p className="text-white/80 text-sm font-light">Заявка принята! Мы свяжемся с вами в ближайшее время.</p>
                <button onClick={() => { setFormState("idle"); setFormName(""); setFormPhone(""); setFormService("") }} className="text-pink-400/60 text-xs hover:text-pink-400 transition-colors">
                  Отправить ещё раз
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="p-5 rounded-2xl border border-pink-500/15 bg-pink-950/20 space-y-3">
                <div className="text-white/25 text-[10px] uppercase tracking-widest mb-2">Заявка онлайн</div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-pink-400/40 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={formPhone}
                  onChange={e => setFormPhone(e.target.value)}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-pink-400/40 transition-colors"
                />
                <select
                  value={formService}
                  onChange={e => setFormService(e.target.value)}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white/40 text-sm font-light focus:outline-none focus:border-pink-400/40 transition-colors appearance-none"
                >
                  <option value="" className="bg-[#1a0012]">Выберите услугу</option>
                  <option value="manicure" className="bg-[#1a0012]">Маникюр — от 1 500 ₽</option>
                  <option value="pedicure" className="bg-[#1a0012]">Педикюр — от 1 800 ₽</option>
                  <option value="nails" className="bg-[#1a0012]">Наращивание — от 2 500 ₽</option>
                  <option value="design" className="bg-[#1a0012]">Дизайн — от 500 ₽</option>
                </select>
                {formError && (
                  <p className="text-pink-400 text-xs">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-400 disabled:opacity-50 text-white text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-pink-900/30 flex items-center justify-center gap-2"
                >
                  {formState === "loading" ? (
                    <>
                      <Icon name="Loader2" size={14} className="animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={14} />
                      Записаться и оплатить
                    </>
                  )}
                </button>
                <p className="text-white/15 text-[10px] text-center">Оплата через ЮКасса · Безопасно</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-white/35 text-xl font-light italic">Nail Studio</div>
          <div className="flex items-center gap-6">
            <a href="#portfolio" className="text-white/20 text-xs hover:text-white/50 transition-colors uppercase tracking-wide">Работы</a>
            <a href="#prices" className="text-white/20 text-xs hover:text-white/50 transition-colors uppercase tracking-wide">Цены</a>
            <a href="#booking" className="text-white/20 text-xs hover:text-white/50 transition-colors uppercase tracking-wide">Запись</a>
          </div>
          <div className="text-white/15 text-xs">© 2024 Nail Studio</div>
        </div>
      </footer>
    </div>
  )
}

export default Index