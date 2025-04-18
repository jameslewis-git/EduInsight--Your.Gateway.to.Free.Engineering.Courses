# ⚡ EduInsight

**EduInsight** is a futuristic, web-based platform that aggregates and categorizes free engineering-related courses from across the web. Designed with students in mind, it simplifies the discovery of high-quality courses by bringing them together into one searchable, categorized interface.

---

## 🚀 Features

- Aggregates **free engineering courses** from platforms like Udemy, Coursera, and more  
- **Futuristic UI** with animations and a light scientific theme  
- **Categorized browsing** and **smart search**  
- **Reusable components** and clean UI using `shadcn/ui`  
- Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**  
- Scraping logic for fetching courses in real-time (modular backend)  
- **Modern design** with a responsive layout and scientific aesthetic  

---

## 🧠 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui  
- **Backend:** Custom scrapers (Node.js / Python-based), API routes in Next.js  
- **Database:** (Add if applicable, e.g., MongoDB, PostgreSQL)  
- **Other Tools:** Git, Vercel (or your deployment platform)  

---

## 📁 Project Structure

```
EduInsight/
├── app/                         # Next.js app router pages
│   ├── api/                     # API endpoints
│   ├── components/              # Reusable components (Navbar, SearchBar, etc.)
│   ├── layout.tsx               # App layout
│   └── page.tsx                 # Home page
├── backend/
│   └── scraper/
│       ├── platforms/           # Platform-specific scrapers (e.g., udemy.py)
│       └── utils/               # Helper functions for scraping
├── public/                      # Static assets
├── styles/                      # Tailwind & custom styles
├── utils/                       # Global utility functions
├── .env                         # Environment variables
├── tailwind.config.ts           # Tailwind configuration
└── README.md                    # You're here!
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/EduInsight.git
cd EduInsight
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root with any required variables like API keys, DB URIs, etc.

```env
# Example
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Run the App Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🕵️ Running Scrapers

```bash
cd backend/scraper/platforms
# Run a specific scraper (Node or Python based)
node udemy_scraper.js
# or
python udemy_scraper.py
```

You can schedule these to run periodically or trigger via APIs.

---

## ✅ TODOs

- [x] Course scraping logic  
- [x] Modern responsive UI  
- [ ] Authentication (Login/Signup)  
- [ ] Save/favorite courses  
- [ ] Admin dashboard to manage data  

---

## 🤝 Contributing

We love contributions!

1. Fork the project  
2. Create your feature branch: `git checkout -b amazing-feature`  
3. Commit your changes: `git commit -m 'Add some feature'`  
4. Push to the branch: `git push origin amazing-feature`  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use and modify it for personal or commercial projects.

---

## 👨‍💻 Developers

- **[Your Name]** – Full Stack Developer  
- **Sumit** – Backend Developer (Scraper logic)  

> Want your name here? Start contributing!

---

## 📬 Contact

Have suggestions or need help?

- Email: your.email@example.com  
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)  
- Twitter: [@yourhandle](https://twitter.com/yourhandle)  

---

## 🌐 Live Demo

**Coming Soon!** (Add your Vercel/Netlify link once deployed)

---

**EduInsight — Redefining the way engineers discover free knowledge.**