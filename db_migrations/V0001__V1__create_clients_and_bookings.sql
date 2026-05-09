
CREATE TABLE IF NOT EXISTS t_p48033744_project_quantum_leap.clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p48033744_project_quantum_leap.bookings (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES t_p48033744_project_quantum_leap.clients(id),
  service VARCHAR(255) NOT NULL,
  price_amount INTEGER,
  status VARCHAR(50) DEFAULT 'new',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON t_p48033744_project_quantum_leap.bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON t_p48033744_project_quantum_leap.bookings(status);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON t_p48033744_project_quantum_leap.clients(phone);
