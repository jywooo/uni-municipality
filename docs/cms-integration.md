# CMS Integration Notes

This frontend supports two data modes.

## Mock mode

- `VITE_DATA_PROVIDER=mock`
- Uses seeded data from `src/app/data/mockData.ts`
- Persists edits in browser local storage
- Good for local UI development before the backend is ready

## CMS mode

- `VITE_DATA_PROVIDER=cms`
- Uses the endpoints defined in `.env.local`
- Supports array responses, `{ data: [...] }`, and Strapi-style `attributes`

## Recommended API contract

- `GET /events`
- `GET /registrations`
- `GET /users`
- `GET /venues`
- `GET /categories`
- `GET /notifications`
- `POST /auth/login`
- `POST /registrations`
- `POST /events`
- `PATCH /events/:id`
- `PATCH /users/:id`
- `PATCH /registrations/:id`
- `POST /notifications`
- `DELETE /registrations/:id`

## Expected login response

```json
{
  "user": {
    "id": "3",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Admin",
    "status": "Active"
  },
  "token": "your-jwt-or-session-token"
}
```

## Expected resource shape

Each resource should follow the fields in `src/app/types/models.ts`.

Example event:

```json
{
  "id": "1",
  "title": "Annual Cultural Festival",
  "description": "Event description",
  "category": "Cultural",
  "venue": "Municipal Hall",
  "date": "2026-06-15",
  "time": "10:00",
  "capacity": 500,
  "registered": 342,
  "registrationDeadline": "2026-06-10",
  "status": "Published",
  "organizerId": "2",
  "imageUrl": "https://..."
}
```

## Recommended backend behavior

- Keep capacity checks on the backend
- Generate QR codes on the backend
- Use SQL as the source of truth behind the CMS or API
- If you use Strapi, create content types that match `src/app/types/models.ts`
