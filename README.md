# Jeevan Shanthi – Backend (Express.js + MongoDB)

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI, Gmail credentials, etc.
   ```

3. **Start MongoDB** (local) or use MongoDB Atlas URI in `.env`

4. **Seed LIC plan data** (one-time)
   ```bash
   # After starting the server, run:
   curl -X POST http://localhost:5000/api/plans/seed
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/plans` | Get all plans (optional: `?category=endowment`) |
| GET | `/api/plans/:planId` | Get single plan |
| POST | `/api/plans/seed` | Seed plan data (one-time) |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contact submissions |
| POST | `/api/leads` | Submit quote/lead request |
| GET | `/api/leads` | Get all leads |

## Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account → Security → App passwords
3. Generate a new app password for "Mail"
4. Use that 16-character password as `EMAIL_PASS` in `.env`

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jeevan_shanthi
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
AGENT_EMAIL=agent_email@gmail.com
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
