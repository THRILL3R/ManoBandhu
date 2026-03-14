# ManoBandhu Backend API

Node.js + TypeScript REST API — the backbone of ManoBandhu, India's first AI-powered mental wellness companion platform.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment (copy and fill in values)
cp .env.example .env

# 3. Run database migrations
npm run migrate

# 4. Seed initial data (admin user + sample events)
npm run seed

# 5. Start development server
npm run dev
```

The API will be available at `http://localhost:PORT/api/v1`

---

## Environment Variables

Create a `.env` file from the template below:

```env
# Server
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/manobandhu

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_ACCESS_SECRET=your_access_secret_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=30d

# AWS S3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=manobandhu-media

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# OpenAI
OPENAI_API_KEY=sk-...
```

---

## Admin Credentials (seeded)

| Field    | Value                   |
|----------|-------------------------|
| Email    | admin@manobandhu.in     |
| Password | Admin@1234              |
| Plan     | premium_plus            |
| Role     | admin (is_admin = true) |

---

## API Endpoints

Base URL: `/api/v1`

### Health
| Method | Path          | Auth | Description                              |
|--------|---------------|------|------------------------------------------|
| GET    | `/api/health` | No   | DB + Redis live check, version, timestamp |

### Auth — `/auth`
| Method | Path                      | Auth    | Description              |
|--------|---------------------------|---------|--------------------------|
| POST   | `/auth/register`          | No      | Register with email      |
| POST   | `/auth/login`             | No      | Login, get tokens        |
| POST   | `/auth/verify-otp`        | No      | Verify OTP               |
| POST   | `/auth/resend-otp`        | No      | Resend OTP               |
| POST   | `/auth/refresh`           | No      | Rotate access token      |
| POST   | `/auth/logout`            | JWT     | Revoke refresh token     |
| POST   | `/auth/forgot-password`   | No      | Request password reset   |
| POST   | `/auth/reset-password`    | No      | Reset with token         |

### Users — `/users`
| Method | Path            | Auth | Description              |
|--------|-----------------|------|--------------------------|
| GET    | `/users/me`     | JWT  | Get profile              |
| PATCH  | `/users/me`     | JWT  | Update profile           |
| DELETE | `/users/me`     | JWT  | Delete account           |

### Emotion Tracker — `/tracker`
| Method | Path              | Auth | Description              |
|--------|-------------------|------|--------------------------|
| GET    | `/tracker`        | JWT  | List logs (paginated)    |
| POST   | `/tracker`        | JWT  | Log emotion              |
| GET    | `/tracker/:id`    | JWT  | Get single log           |
| DELETE | `/tracker/:id`    | JWT  | Delete log               |
| GET    | `/tracker/stats`  | JWT  | Weekly stats             |

### Self-Regulation — `/regulation`
| Method | Path                    | Auth    | Description              |
|--------|-------------------------|---------|--------------------------|
| GET    | `/regulation/techniques`| No      | List all techniques      |
| POST   | `/regulation/session/start` | JWT | Start session            |
| POST   | `/regulation/session/:id/complete` | JWT | Complete session |
| GET    | `/regulation/points`    | JWT     | Get points balance       |

### Rituals — `/rituals`
| Method | Path                    | Auth | Description              |
|--------|-------------------------|------|--------------------------|
| GET    | `/rituals/morning`      | JWT  | List morning rituals     |
| POST   | `/rituals/morning`      | JWT  | Log morning ritual       |
| GET    | `/rituals/night`        | JWT  | List night rituals       |
| POST   | `/rituals/night`        | JWT  | Log night ritual         |

### Growth Circles — `/circles`
| Method | Path                        | Auth | Description              |
|--------|-----------------------------|------|--------------------------|
| GET    | `/circles`                  | JWT? | Browse circles           |
| POST   | `/circles`                  | JWT  | Create circle            |
| GET    | `/circles/:id`              | JWT? | Circle detail            |
| POST   | `/circles/:id/join`         | JWT  | Join circle              |
| POST   | `/circles/:id/leave`        | JWT  | Leave circle             |
| POST   | `/circles/:id/posts`        | JWT  | Post to circle           |

### Private Diary — `/diary` *(premium)*
| Method | Path                         | Auth              | Description              |
|--------|------------------------------|-------------------|--------------------------|
| GET    | `/diary`                     | JWT + premium     | List entries (metadata)  |
| POST   | `/diary`                     | JWT + premium     | Create entry (encrypted) |
| GET    | `/diary/search`              | JWT + premium     | Search by tag/date       |
| GET    | `/diary/media/upload-url`    | JWT + premium     | Get S3 presigned URL     |
| GET    | `/diary/:id`                 | JWT + premium     | Get full entry           |
| PATCH  | `/diary/:id`                 | JWT + premium     | Update entry             |
| DELETE | `/diary/:id`                 | JWT + premium     | Delete entry             |

### Subscriptions — `/subscriptions`
| Method | Path                         | Auth  | Description              |
|--------|------------------------------|-------|--------------------------|
| GET    | `/subscriptions/plans`       | No    | List plans + pricing     |
| POST   | `/subscriptions/checkout`    | JWT   | Create Razorpay order    |
| POST   | `/subscriptions/webhook`     | Webhook | Razorpay webhook      |
| GET    | `/subscriptions/me`          | JWT   | My subscription status   |
| POST   | `/subscriptions/cancel`      | JWT   | Cancel subscription      |

### Wellness Events — `/events`
| Method | Path                         | Auth       | Description              |
|--------|------------------------------|------------|--------------------------|
| GET    | `/events`                    | Optional   | List published events    |
| GET    | `/events/my-bookings`        | JWT        | My bookings              |
| POST   | `/events/listing-request`    | JWT        | Submit event for review  |
| POST   | `/events`                    | JWT+Admin  | Create published event   |
| GET    | `/events/:id`                | Optional   | Event details            |
| POST   | `/events/:id/book`           | JWT        | Book an event            |

### AI Insights — `/insights` *(premium)*
| Method | Path                    | Auth            | Description              |
|--------|-------------------------|-----------------|--------------------------|
| GET    | `/insights/weekly`      | JWT + premium   | Latest weekly insight    |
| GET    | `/insights/weekly/:id`  | JWT + premium   | Specific week insight    |
| GET    | `/insights/monthly`     | JWT + premium   | 4-week aggregate         |
| POST   | `/insights/generate`    | JWT + Admin     | Trigger generation       |

---

## Database Migrations

Migrations run in filename order from `src/migrations/`. To add a migration create `NNN_description.sql` and run `npm run migrate`.

| File | Description |
|------|-------------|
| 001 | UUID extension |
| 002 | Users table |
| 003 | Subscriptions |
| 004 | Refresh tokens |
| 005 | Emotion logs |
| 006 | Regulation techniques + sessions + points |
| 007 | Morning rituals |
| 008 | Night rituals |
| 009 | Diary entries |
| 010 | Insight reports |
| 011 | Wellness events + bookings |
| 012 | Growth circles + members + posts |
| 013 | Notifications |
| 014 | (pending review status) |
| 015 | Diary media columns |
| 016 | Subscription status patch |
| 017 | is_admin column on users |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 22 + TypeScript |
| Framework | Express 5 |
| Database | PostgreSQL (pg pool) |
| Cache / Queue | Redis + BullMQ |
| Auth | JWT (access + refresh) |
| Payments | Razorpay |
| Storage | AWS S3 |
| AI | OpenAI GPT-4o |
| Validation | Zod |
| Encryption | AES-256-GCM (diary content) |
