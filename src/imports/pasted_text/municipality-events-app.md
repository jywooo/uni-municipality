Create a professional university project web application for a Municipality Events Management System.

Use simple, clean, beginner-friendly code with HTML, CSS, JavaScript, and React. Keep the structure clear and easy to understand. Do not over-engineer. The project should look professional but still realistic for a university MIS project.

Project idea:
Municipalities need a web platform to publish public events, manage online registrations, send confirmations, use QR-code check-in, and view basic analytics. The system should support three roles: Participant, Organizer/Staff, and Administrator. The goal is to reduce manual work, avoid duplicate/uncontrolled registrations, improve communication, and track attendance properly.

Design style:
- Clean municipal/government style
- Modern but simple
- Mobile-friendly
- Colors: navy blue, white, light gray, and a small green accent
- Clear typography
- Cards, tables, forms, simple dashboards
- Professional university project quality

Required pages:

1. Public Home Page
- Hero section: “Municipality Events Management System”
- Short description
- Buttons: Browse Events, Login
- Sections for upcoming events, system benefits, and how it works

2. Events Catalog Page
- List/grid of municipal events
- Search bar
- Filters: date, category, venue
- Event cards showing title, category, date, venue, capacity, and Register button

3. Event Details Page
- Full event information
- Date, time, venue, category, available seats, registration deadline
- Register button
- Simple map/location placeholder
- Organizer contact information

4. Registration Page
- Form fields:
  - Full name
  - Email
  - Phone number
  - Municipality/Area
  - Notes
- Checkbox for data privacy consent
- Submit button
- Confirmation message after submission

5. Registration Confirmation Page
- Show registration status: Confirmed
- Show event name and participant name
- Display a QR code placeholder
- Message saying the QR code will be used for check-in

6. Login Page
- Email and password fields
- Role selector or demo login buttons:
  - Login as Participant
  - Login as Organizer
  - Login as Admin

7. Participant Dashboard
- My registered events
- Status badges: Registered, Confirmed, Attended, Absent
- View QR code button
- Cancel registration button
- Upcoming reminders section

8. Organizer Dashboard
- Summary cards:
  - Total events
  - Total registrations
  - Attendance rate
  - Capacity utilization
- Table of events managed by organizer
- Buttons: Create Event, View Registrations, Check-In

9. Create/Edit Event Page
- Form fields:
  - Event title
  - Description
  - Category
  - Venue
  - Date
  - Time
  - Capacity
  - Registration deadline
  - Status: Draft / Published / Closed
- Save button

10. Registrations Management Page
- Table of participants
- Columns:
  - Name
  - Email
  - Phone
  - Event
  - Status
  - Registration date
- Actions:
  - Confirm
  - Mark attended
  - Mark absent
  - Export list button

11. QR Check-In Page
- Camera scanner placeholder
- Manual code input
- Check-in button
- Recent check-ins table
- Success message when participant is checked in

12. Admin Dashboard
- Summary cards:
  - Users
  - Venues
  - Categories
  - Events
- Admin navigation cards:
  - Manage Staff
  - Manage Venues
  - Manage Categories
  - System Reports

13. Staff/User Management Page
- Table of users
- Columns:
  - Name
  - Email
  - Role
  - Status
- Buttons:
  - Add Staff
  - Edit
  - Disable

14. Venues Management Page
- Table of venues
- Columns:
  - Venue name
  - Address
  - Capacity
  - Status
- Add/Edit venue form

15. Categories Management Page
- Table of categories
- Examples:
  - Cultural
  - Sports
  - Awareness
  - Youth
  - Environment
- Add/Edit/Delete category buttons

16. Analytics / Reports Page
- Simple charts or chart placeholders
- KPIs:
  - Total registrations
  - Attendance rate
  - No-show rate
  - Capacity utilization
  - Registrations by category
  - Venue usage
- Keep charts simple and readable

17. Notifications Page
- List of sent messages
- Form to send update/reminder to participants
- Notification types:
  - Confirmation
  - Reminder
  - Event update
  - Cancellation

18. 404 Page
- Simple not found page with button back to home

Functional behavior:
- Use mock data only, no backend needed
- Store demo data in simple JavaScript arrays/objects
- Use React components clearly
- Use simple routing between pages
- Use reusable components:
  - Navbar
  - Sidebar
  - EventCard
  - StatusBadge
  - DashboardCard
  - DataTable
  - FormInput
- Make role-based navigation:
  - Public users see Home, Events, Login
  - Participants see My Registrations
  - Organizers see Events, Registrations, Check-In, Analytics
  - Admins see Admin Dashboard, Users, Venues, Categories, Reports

Important:
- Keep code simple and readable
- Add comments where useful
- Avoid unnecessary libraries
- Do not add online payment, national ID verification, or mobile app features
- Make the final result feel like a serious university project, not a commercial enterprise app