# 🚀 Online Hobby & Skills Tracker

A full-stack web application designed to help users build consistency in their hobbies, log practice sessions, visualize their progress, and share milestones with a community. 

Built as a robust alternative to Backend-as-a-Service (BaaS) platforms, this project uses a custom REST API architecture, relational database management, and a modern React frontend.

## 🎯 Features

* **Progress Analytics Dashboard:** Real-time calculation of total practice hours, active skills, and current streaks.
* **Skill Management:** Define custom hobbies/skills (e.g., Guitar, Coding, Photography) and set target practice hours.
* **Session Tracking:** Log daily practice sessions with durations and descriptive notes.
* **Community Feed:** A global social feed where users can post updates and upload achievement images.
* **File Handling:** Built-in multipart form data processing for local image uploads (simulating cloud object storage).
* **Database Seeding:** Automated data generation script for instant testing and demonstration.

## 🛠️ Technology Stack

**Frontend:**
* React 18 (via Vite)
* Tailwind CSS (v4)
* React Router DOM
* Axios (for API communication)
* Lucide React (Icons)

**Backend:**
* Python 3
* FastAPI (High-performance REST framework)
* SQLAlchemy (ORM for relational data)
* SQLite (Zero-configuration local database)
* Uvicorn (ASGI web server)

## 📂 Folder Structure

```text
Hobby-Tracker-App/
├── backend/
│   ├── uploads/                # Local object storage (Images)
│   ├── hobby_tracker.db        # SQLite database 
│   ├── main.py                 # FastAPI REST endpoints & Auth logic
│   ├── models.py               # SQLAlchemy Database schemas
│   ├── seed.py                 # Dummy data generator
│   └── requirements.txt        # Python dependencies list
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.jsx   # Personal Stats & Tracking UI
    │   │   └── Community.jsx   # Global Feed & Upload UI
    │   ├── App.jsx             # React Routing & Main Layout
    │   ├── index.css           # Tailwind styling injection
    │   └── main.jsx            # React entry point 
    ├── index.html              # Main HTML document
    ├── package.json            # Node scripts & dependencies
    └── vite.config.js          # Vite & Tailwind configuration
