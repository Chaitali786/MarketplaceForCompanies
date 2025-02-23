# Marketplace Project

## 🚀 Overview
This is a marketplace web application built using Next.js 15, Supabase, TailwindCSS, and ShadCN/UI. The app allows users to list companies for sale, express interest in companies, and view interested buyers, with role-based access for buyers and sellers.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15,React
- **Database & Authentication:** Supabase
- **Styling:** TailwindCSS & ShadCN/UI
- **Deployment:** Vercel

## 📦 Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd marketplace-project
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

---

## 💾 Database Setup
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project and note down the **Project URL** and **Anon Key**.
3. Create tables for storing users, companies, and interests as per the app's functionality.

---

## 🏃‍♂️ Run Locally
To start the development server, run:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🚀 Deployment on Vercel
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your GitHub repository.
3. Add environment variables under **Project Settings > Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** and wait for the process to complete.

---

## ✅ Features
- User roles: Buyer and Seller
- Authentication (Sign Up, Login, Logout)
- List companies for sale (Seller only)
- Express interest in companies (Buyer only)
- View interested buyers (Seller only)
- Search and filter companies

---


## 🐛 Troubleshooting
- If you encounter deployment issues, check the **Build Logs** on Vercel.
- Ensure all environment variables are correctly configured.

## 🙌 Acknowledgments
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

---

### 🗂 Repository Structure & Contribution Guidelines
- For contributions, please fork the repository and submit a pull request.
- Follow the code style and conventions used in the project.

---



