# Project Cheat Sheet

This file is a quick guide for:

- changing simple things in the project
- answering common university doctor questions
- finding the main files quickly

The project is built for presentation and learning, so this guide is written in simple language.

## 1. What Is This Project?

This project is a **Municipality Events Management System** for Lebanese municipalities.

It helps with:

- publishing events
- participant registration
- QR check-in
- attendance tracking
- organizer and admin dashboards

## 2. What Technologies Are Used?

Short answer:

- `React`
- `JavaScript / JSX`
- `HTML`
- `CSS` with `Tailwind`
- `Vite`
- `React Router`

Important note:

- this is a **frontend-only project**
- there is **no real backend yet**
- there is **no real database yet**
- data is stored in **mock data** and browser storage for demo use

## 3. Main Files You Should Know

These are the most important files:

- `src/main.jsx`
  What it does: starts the React app

- `src/app/App.jsx`
  What it does: wraps the app with providers

- `src/app/routes.jsx`
  What it does: contains all page routes

- `src/data/mockData.js`
  What it does: contains sample users, events, registrations, venues, and categories

- `src/app/context/AppDataContext.jsx`
  What it does: manages app data like events, registrations, users, and statuses

- `src/app/context/AuthContext.jsx`
  What it does: manages login, logout, and participant signup

## 4. If I Want To Change Something, Where Do I Go?

### Change the homepage background image

File:

- `src/app/pages/Home.jsx`

Image file:

- `src/assets/municipality-hero.png`

### Change the big homepage title or paragraph

File:

- `src/app/pages/Home.jsx`

### Change navbar text or buttons

File:

- `src/app/components/Navbar.jsx`

### Change footer content

File:

- `src/app/components/Footer.jsx`

### Change colors or global theme

File:

- `src/styles/theme.css`

### Change event cards

File:

- `src/app/components/EventCard.jsx`

### Change the QR page or QR design

Files:

- `src/app/components/RegistrationQRCode.jsx`
- `src/app/lib/qr.js`

### Change the scan/check-in page

Files:

- `src/app/pages/organizer/CheckIn.jsx`
- `src/app/pages/ScanCheckIn.jsx`

### Change the registrations list

File:

- `src/app/pages/organizer/RegistrationsManagement.jsx`

### Change sample users, events, or registrations

File:

- `src/data/mockData.js`

## 5. Where Are The Users, Events, And Registrations?

All demo data starts in:

- `src/data/mockData.js`

Inside this file you will find:

- `users`
- `events`
- `registrations`
- `venues`
- `categories`
- `notifications`

## 6. Where Does A New Participant Account Get Created?

Files:

- `src/app/pages/SignUp.jsx`
- `src/app/context/AuthContext.jsx`
- `src/app/context/AppDataContext.jsx`

Simple explanation:

- the user fills the signup form
- the app creates a new participant account
- the participant is stored in app data
- the participant is logged in automatically

## 7. Where Is Login?

File:

- `src/app/pages/Login.jsx`

Simple explanation:

- login uses email and password
- demo role buttons still exist for quick testing

## 8. Demo Password For Seeded Accounts

Default password:

- `municipality123`

Example seeded emails:

- `participant@municipality.gov.lb`
- `organizer@municipality.gov.lb`
- `admin@municipality.gov.lb`
- `test.participant@municipality.gov.lb`

## 9. How Does The QR Code Work?

Simple explanation:

1. when a participant registers, the app creates a registration
2. the app also creates a short scan token
3. a QR code is generated from that token
4. scanning the QR opens a web check-in page
5. the organizer confirms attendance
6. the registration status becomes `Attended`

Main files:

- `src/app/components/RegistrationQRCode.jsx`
- `src/app/lib/qr.js`
- `src/app/pages/organizer/CheckIn.jsx`
- `src/app/pages/ScanCheckIn.jsx`

## 10. Where Can I See Who Registered?

Organizer page:

- route: `/organizer/registrations`

File:

- `src/app/pages/organizer/RegistrationsManagement.jsx`

This page shows:

- participant name
- email
- event
- status
- registration date

## 11. Common Questions From A University Doctor

### Q: Is this project frontend or backend?

Answer:

This project is currently frontend-only. It simulates a real municipality system using mock data and browser storage for demonstration purposes.

### Q: Why did you use mock data?

Answer:

Mock data makes the project easier to present, test, and explain before connecting a real CMS or database.

### Q: Can this project connect to a backend later?

Answer:

Yes. The structure is ready to be connected later to a CMS backend and SQL database.

### Q: What roles exist in the system?

Answer:

There are four main roles:

- Public user
- Participant
- Organizer
- Administrator

### Q: What does the organizer do?

Answer:

The organizer can create events, manage registrations, use QR check-in, send notifications, and view analytics.

### Q: What does the admin do?

Answer:

The admin manages users, venues, and categories, and reviews the overall system structure.

### Q: How does attendance work?

Answer:

Attendance is recorded using a QR check-in flow. When the organizer scans or opens the QR check-in page, the participant status can be updated to `Attended`.

### Q: Can the same person be marked attended twice?

Answer:

No. If the participant is already marked as `Attended`, the app blocks repeated attendance updates for the same registration.

### Q: Where is routing handled?

Answer:

Routing is handled in:

- `src/app/routes.jsx`

### Q: Where is authentication handled?

Answer:

Authentication is handled in:

- `src/app/context/AuthContext.jsx`

### Q: Where is application data handled?

Answer:

Application data is handled in:

- `src/app/context/AppDataContext.jsx`

## 12. Quick Presentation Script

You can say something like this:

"This project is a Municipality Events Management System built with React and JavaScript. It is designed for Lebanese municipalities to publish events, manage participant registrations, use QR check-in, and track attendance. The system supports public users, participants, organizers, and administrators. For this university version, the project uses mock data and browser storage instead of a real backend, but the structure can later be connected to a CMS and SQL database."

## 13. Quick Editing Cheat Sheet

If you want to change:

- homepage image: `src/assets/municipality-hero.png`
- homepage text: `src/app/pages/Home.jsx`
- routes/pages: `src/app/routes.jsx`
- users/events/registrations: `src/data/mockData.js`
- login/signup: `src/app/pages/Login.jsx` and `src/app/pages/SignUp.jsx`
- QR behavior: `src/app/lib/qr.js`
- QR scan page: `src/app/pages/organizer/CheckIn.jsx`
- registrations table: `src/app/pages/organizer/RegistrationsManagement.jsx`
- theme colors: `src/styles/theme.css`

## 14. Final Note

If you forget where something is, start by checking:

1. `src/app/routes.jsx`
2. `src/data/mockData.js`
3. `src/app/context/AppDataContext.jsx`
4. the page or component file itself

Those four places answer most beginner questions in this project.
