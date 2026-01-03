# Contact Management Application

A full-stack contact management application built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- ✅ Add new contacts with validation
- ✅ View all contacts in a beautiful table
- ✅ Search contacts by name, email, phone, or message
- ✅ Delete contacts
- ✅ Duplicate prevention (email and phone)
- ✅ Responsive design with modern UI
- ✅ Real-time updates

## Tech Stack

### Frontend
- React 18
- Tailwind CSS 3
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd contact-management-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env` file in the `frontend` directory (optional for local development):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Run the Application**

   **Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm start
   ```

   The frontend will open at http://localhost:3000
   The backend API will run at http://localhost:5000

## Deployment

This application is configured for deployment on:
- **Backend**: Render (or Railway, Heroku, etc.)
- **Frontend**: Vercel (or Netlify)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
contact-management-app/
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env (create this)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.js
│   │   │   └── ContactList.js
│   │   ├── config.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env (optional for local)
├── DEPLOYMENT.md
└── README.md
```

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact

## Environment Variables

### Backend
- `MONGO_URI` - MongoDB connection string (required)
- `PORT` - Server port (default: 5000)

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000)

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

