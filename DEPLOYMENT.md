# Aura Flowers CMS - Setup & Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/aura-flowers?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-here-change-this
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@aurahouseofflowers.com
ADMIN_PASSWORD=changeme123
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Replace `<username>`, `<password>`, and `<cluster-url>` in MONGODB_URI

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Admin User

```bash
npx tsx scripts/seed-admin.ts
```

This will create an admin user with:
- **Email:** admin@aurahouseofflowers.com
- **Password:** changeme123

⚠️ **IMPORTANT:** Change the password after first login!

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📦 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add CMS backend"
git push
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **Don't deploy yet!** First, add environment variables

### Step 3: Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.vercel.app
```

### Step 4: Deploy

Click "Deploy" and wait for deployment to complete.

### Step 5: Seed Admin User in Production

Option A - Using Vercel CLI:
```bash
vercel env pull
npx tsx scripts/seed-admin.ts
```

Option B - Manually:
1. Connect to MongoDB Atlas
2. Use MongoDB Compass or Atlas UI
3. Insert admin document with hashed password

---

## 🔐 Security Checklist

- [ ] Changed default admin password
- [ ] Set strong NEXTAUTH_SECRET
- [ ] MongoDB IP whitelist configured
- [ ] Environment variables in Vercel (not in code)
- [ ] `.env.local` in `.gitignore`

---

## 📂 Project Structure

```
app/
├── actions.ts              # Server Actions (CRUD)
├── admin/
│   ├── layout.tsx         # Protected admin layout
│   ├── login/page.tsx     # Admin login
│   └── items/
│       ├── page.tsx       # Items list
│       └── ItemsManager.tsx # CRUD UI
├── api/auth/[...nextauth]/route.ts # Auth API
├── item/[slug]/page.tsx   # Public item page
lib/
├── auth.ts                # Auth.js config
├── db.ts                  # MongoDB connection
├── models/
│   ├── AdminUser.ts      # Admin model
│   └── Item.ts           # Item model
scripts/
└── seed-admin.ts         # Admin seeding script
```

---

## 🎯 Admin Features

### Items Management (`/admin/items`)

- ✅ Create new items
- ✅ Edit existing items
- ✅ Delete items
- ✅ Auto-generate SEO-friendly slugs
- ✅ Organize by collection
- ✅ Upload multiple images
- ✅ Set price, dimensions, material

### Collections (Static)

- `artificial-flowers`
- `artificial-green-plants`
- `bonsai`
- `hanging-greenery`
- `decor-accessories`

---

## 🔧 Common Tasks

### Add a New Admin User

```typescript
// Connect to MongoDB
// Use MongoDB Compass or run a script similar to seed-admin.ts
import bcrypt from 'bcryptjs'

const hashedPassword = await bcrypt.hash('newpassword', 10)
await AdminUser.create({
  email: 'newadmin@example.com',
  password: hashedPassword,
  role: 'admin'
})
```

### Change Admin Password

```typescript
import bcrypt from 'bcryptjs'

const admin = await AdminUser.findOne({ email: 'admin@example.com' })
admin.password = await bcrypt.hash('newpassword', 10)
await admin.save()
```

### Reset Database

```bash
# In MongoDB Atlas, delete the database
# Then re-run seed script
npx tsx scripts/seed-admin.ts
```

---

## 🐛 Troubleshooting

### "MongoServerError: Authentication failed"
- Check MONGODB_URI credentials
- Verify database user has read/write permissions

### "Invalid token specified"
- Regenerate NEXTAUTH_SECRET
- Clear browser cookies and try again

### "Cannot find module 'mongoose'"
- Run `npm install`
- Check that node_modules exists

### Admin page redirects to login
- Verify session is working
- Check NEXTAUTH_URL matches your domain
- Clear cookies and log in again

---

## 📝 Notes

- **No public signup:** Only admins can create/edit content
- **Collections are static:** Defined in `lib/models/Item.ts`
- **Items are dynamic:** Managed through admin panel
- **Server Actions:** All CRUD operations use Next.js Server Actions
- **Authentication:** Session-based with Auth.js (NextAuth v5)
- **Database:** MongoDB Atlas with Mongoose ORM

---

## 🆘 Support

For issues:
1. Check MongoDB Atlas connection
2. Verify environment variables
3. Check Vercel deployment logs
4. Review browser console for errors

---

Made with ❤️ for Aura House of Flowers
