CREATE TABLE categories (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT NOT NULL
);

CREATE TABLE venues (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(160) NOT NULL UNIQUE,
  address TEXT NOT NULL,
  capacity INT NOT NULL CHECK (capacity > 0),
  status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive'))
);

CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  role VARCHAR(16) NOT NULL CHECK (role IN ('Participant', 'Organizer', 'Admin')),
  status VARCHAR(16) NOT NULL CHECK (status IN ('Active', 'Inactive'))
);

CREATE TABLE events (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(120) NOT NULL,
  venue VARCHAR(160) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  capacity INT NOT NULL CHECK (capacity > 0),
  registered INT NOT NULL DEFAULT 0 CHECK (registered >= 0),
  registration_deadline DATE NOT NULL,
  status VARCHAR(16) NOT NULL CHECK (status IN ('Draft', 'Published', 'Closed')),
  organizer_id VARCHAR(64) NOT NULL,
  image_url TEXT,
  CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES users(id)
);

CREATE TABLE registrations (
  id VARCHAR(64) PRIMARY KEY,
  event_id VARCHAR(64) NOT NULL,
  participant_id VARCHAR(64) NOT NULL,
  participant_name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  municipality VARCHAR(160) NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  status VARCHAR(16) NOT NULL CHECK (status IN ('Registered', 'Confirmed', 'Attended', 'Absent')),
  registration_date DATE NOT NULL,
  qr_code VARCHAR(120) NOT NULL UNIQUE,
  CONSTRAINT fk_registrations_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT fk_registrations_user FOREIGN KEY (participant_id) REFERENCES users(id)
);

CREATE TABLE notifications (
  id VARCHAR(64) PRIMARY KEY,
  type VARCHAR(32) NOT NULL CHECK (type IN ('Confirmation', 'Reminder', 'Event update', 'Cancellation')),
  event_id VARCHAR(64) NOT NULL,
  message TEXT NOT NULL,
  sent_date DATE NOT NULL,
  recipient_count INT NOT NULL DEFAULT 0 CHECK (recipient_count >= 0),
  CONSTRAINT fk_notifications_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_participant_id ON registrations(participant_id);
