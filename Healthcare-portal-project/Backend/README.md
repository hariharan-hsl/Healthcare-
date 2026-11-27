# Healthcare+ backend

## Structure

```text
src/
  config/       Database connection and configuration
  controllers/  HTTP request and response handling
  middleware/   Database checks and centralized error handling
  models/       Mongoose schemas
  routes/       API endpoint definitions
  services/     Database operations and business logic
  app.js        Express app configuration
  server.js     Local server startup and environment loading
.env            Local secrets (not committed)
.env.example    Required environment variable template
```

## Local setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` to your Atlas connection URI.
2. In Atlas, create a database user and allow the public IP of the machine running this backend.
3. Install dependencies with `npm install`.
4. Start the API with `npm run dev`.
5. Check `http://localhost:5000/health`; a successful response reports that the database is connected.

Never put `MONGO_URI` in frontend environment variables or commit `.env`.

The appointment endpoints are `POST /api/appointments/book` and
`GET /api/appointments/booked?doctor=<doctor>&date=YYYY-MM-DD`.
