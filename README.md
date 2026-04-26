# 📊 Mini CRM — Client Lead Management System

> Built for **Future Interns | Full Stack Web Development | Task 2**

A production-ready Client Lead Management System built with the MERN stack. Businesses use this to collect leads from a contact form, manage them through a secure admin dashboard, and automatically notify customers via email when their status changes.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ Live Website | https://future-fs-02-5ey2cmf75-anusuya2005s-projects.vercel.app/ |
| ⚙️ Backend API | https://future-fs-02-backend-tcf7.onrender.com |
| 📂 GitHub Repo | https://github.com/anusuya2005/FUTURE_FS_02 |

## ⚠️ Important Note for Evaluators

This project is hosted on Render free tier which sleeps after inactivity.

**Before testing, please open this link first:**

https://future-fs-02-backend-tcf7.onrender.com

Wait until you see this message:

    Mini CRM Backend is Running! 🚀

Then open the main website. Everything will work instantly after that.

The backend has a keep-alive system that pings itself every 14 minutes to stay awake during active use.

---

## 🔐 Evaluator Access

| Field | Value |
|-------|-------|
| Login URL | https://future-fs-02-5ey2cmf75-anusuya2005s-projects.vercel.app/login |
| Username | admin |
| Password | Admin1234 |

---

## 📌 All Pages

| Page | URL | Access |
|------|-----|--------|
| 🏠 Landing Page | / | Everyone |
| 📬 Contact Form | /contact | Customers |
| 🔍 Track Status | /track | Customers |
| 🔐 Admin Login | /login | Admin only |
| 📊 Dashboard | /dashboard | Admin only |

---

## 💡 What Is This Project?

A CRM (Client Relationship Management) system is used by businesses to manage incoming client inquiries called leads.

Real world example — A restaurant wants to list on Swiggy. They fill a registration form. Swiggy's admin team sees the request in their dashboard, reviews it, contacts the restaurant, and once approved marks it as Converted. The restaurant gets email updates at every step. This project works exactly the same way.

---

## 🔄 How It Works

1. Customer fills the Contact Form
2. Lead is saved to MongoDB database
3. Customer receives a confirmation email
4. Admin logs into the Dashboard
5. Admin reviews the lead and updates the status
6. Customer receives an email notification automatically
7. Customer can track their status at the Track page

---

## ✨ Features

### Customer Side
- Submit inquiry via contact form
- Receive confirmation email instantly
- Track application status using email address
- See progress bar showing New, Contacted, Converted
- Read follow-up notes left by admin

### Admin Side
- Secure login with JWT authentication
- Registration locked after first admin is created
- View all leads in a professional dashboard table
- Analytics cards showing Total, New, Contacted, Converted counts
- Update lead status with one click
- Add follow-up notes visible to the customer
- Search leads by name or email
- Filter leads by status
- Auto email sent to customer on every status change
- Delete spam or invalid leads
- Fully mobile responsive on all devices

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js + Vite | User interface |
| Styling | CSS3 + Google Fonts | Responsive design |
| Backend | Node.js + Express.js | REST API server |
| Database | MongoDB + Mongoose | Data storage |
| Authentication | JWT + bcryptjs | Secure admin login |
| Email | Nodemailer + Gmail | Status notifications |
| HTTP Client | Axios | API communication |
| Routing | React Router DOM | Page navigation |
| Frontend Hosting | Vercel | Live deployment |
| Backend Hosting | Render | Live deployment |
| Cloud Database | MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

    FUTURE_FS_02/
    │
    ├── backend/
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   ├── models/
    │   │   ├── Admin.js
    │   │   └── Lead.js
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   └── leadRoutes.js
    │   ├── utils/
    │   │   └── sendEmail.js
    │   ├── .env
    │   └── server.js
    │
    ├── frontend/
    │   └── src/
    │       ├── components/
    │       │   ├── Navbar.jsx
    │       │   └── Sidebar.jsx
    │       ├── context/
    │       │   └── AuthContext.jsx
    │       ├── pages/
    │       │   ├── Landing.jsx
    │       │   ├── ContactForm.jsx
    │       │   ├── TrackStatus.jsx
    │       │   ├── Login.jsx
    │       │   ├── Register.jsx
    │       │   └── Dashboard.jsx
    │       ├── config.js
    │       ├── App.jsx
    │       ├── index.css
    │       └── main.jsx
    │
    └── README.md

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js v18 or higher
- MongoDB installed locally
- Git

### Step 1 — Clone the Repository

    git clone https://github.com/anusuya2005/FUTURE_FS_02.git
    cd FUTURE_FS_02

### Step 2 — Setup Backend

    cd backend
    npm install

Create a .env file inside the backend folder with these values:

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/minicrm
    JWT_SECRET=mysecretkey123
    ADMIN_SECRET_KEY=SWIGGY_ADMIN_2026
    EMAIL_USER=yourgmail@gmail.com
    EMAIL_PASS=your_gmail_app_password

To get EMAIL_PASS go to Google Account, then Security, then 2-Step Verification, then App Passwords, then Generate.

Start the backend:

    npm run dev

You should see these messages:

    MongoDB Connected
    Server running on port 5000

### Step 3 — Setup Frontend

    cd ../frontend
    npm install
    npm run dev

Open http://localhost:5173 in your browser.

### Step 4 — Create Admin Account

Go to http://localhost:5173/register and enter these details:

    Username: admin
    Password: Admin1234

Click Create Account. After the first admin is created, registration is locked and new admins require the ADMIN_SECRET_KEY.

---

## 🔐 Security Features

| Feature | How It Works |
|---------|-------------|
| JWT Authentication | Admin receives a token on login required for all protected API calls |
| Password Encryption | Passwords hashed with bcryptjs before storing in database |
| Protected Routes | Dashboard redirects to login if no valid token is found |
| Locked Registration | After first admin, new accounts require a secret organisation key |
| CORS Protection | Backend only accepts requests from authorised frontend URLs |

---

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| Desktop and Laptop | Full sidebar with 4 column stats grid |
| Tablet | Collapsible sidebar with 2 column stats grid |
| Mobile and Android | Slide-in drawer with fully stacked layout |

---

## 📧 Email Notification System

Customers receive automatic emails when:

- They submit the contact form and receive a confirmation
- Admin changes status to Contacted
- Admin changes status to Converted and customer receives a congratulations email

Each email includes the current status, admin notes, and a link to track their application.

---

## 🌍 Real World Applications

| Business | Use Case |
|----------|---------|
| Digital Agency | Track client inquiries from website |
| Restaurant Platform | Manage restaurant onboarding requests |
| Freelancer | Manage project inquiries from clients |
| Clinic | Track patient appointment requests |
| Startup | Manage early customer signups |

---

## 👨‍💻 Developer

**Anusuya**

Future Interns — Full Stack Web Development Internship 2026

- GitHub: https://github.com/anusuya2005
- LinkedIn: https://www.linkedin.com/in/anusuya-v-5b548a303/

---

*Treat each task as if it were for a real client — Future Interns*