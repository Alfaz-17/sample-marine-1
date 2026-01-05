# Local MongoDB Setup - Step-by-Step Guide

## 🎯 Two Approaches

### Option 1: Local MongoDB (Recommended for Development)
✅ No internet required
✅ Free forever
✅ Fast and simple
✅ Full control

### Option 2: MongoDB Atlas (Recommended for Production)
✅ Cloud-hosted
✅ Free tier available
✅ Automatic backups
✅ Scalable

---

## 🔧 Setup Local MongoDB (Windows)

### Step 1: Install MongoDB Community Edition

**Download:**
1. Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Select:
   - **Version:** Latest (7.0+)
   - **Platform:** Windows
   - **Package:** MSI
3. Download and run the installer

**Installation:**
1. Run the MSI installer
2. Choose "Complete" installation
3. **IMPORTANT:** Check "Install MongoDB as a Service"
4. Keep default settings:
   - Service Name: `MongoDB`
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log`
5. **OPTIONAL:** Install MongoDB Compass (GUI tool)
6. Complete the installation

### Step 2: Verify MongoDB is Running

Open **PowerShell** or **Command Prompt** and run:

```bash
# Check if MongoDB service is running
Get-Service MongoDB

# Should show:
# Status   Name               DisplayName
# ------   ----               -----------
# Running  MongoDB            MongoDB
```

If it's not running, start it:

```bash
# Start MongoDB service
net start MongoDB
```

### Step 3: Test Connection

```bash
# Connect to MongoDB shell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to:          mongodb://127.0.0.1:27017/
Using MongoDB:          7.0.x
```

Type `exit` to quit the shell.

---

## 🔌 Configure Your Project

### Create `.env.local` File

In your project root (`my-app/.env.local`):

```env
# ============================================
# LOCAL MONGODB (for development)
# ============================================
MONGODB_URI=mongodb://localhost:27017/aura-flowers

# ============================================
# OR MongoDB Atlas (for production)
# ============================================
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aura-flowers?retryWrites=true&w=majority

# ============================================
# NextAuth Configuration
# ============================================
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# ============================================
# Admin Credentials (for seeding)
# ============================================
ADMIN_EMAIL=admin@aurahouseofflowers.com
ADMIN_PASSWORD=changeme123
```

### Local MongoDB URL Explained

```
mongodb://localhost:27017/aura-flowers
         ↓         ↓      ↓
      host:ip    port   database
```

- `localhost` or `127.0.0.1` = Your local machine
- `27017` = Default MongoDB port
- `aura-flowers` = Database name (will be created automatically)

---

## 🚀 Quick Start (Complete Flow)

### 1. Generate NextAuth Secret

```bash
# PowerShell
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Copy the output to `NEXTAUTH_SECRET` in `.env.local`

### 2. Install Dependencies (if not done)

```bash
npm install
```

### 3. Create Admin User

```bash
npm run seed:admin
```

Expected output:
```
✓ Admin user created successfully!
Email: admin@aurahouseofflowers.com
Password: changeme123

⚠️  IMPORTANT: Change the password after first login!
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Access Admin Panel

Open browser and go to:
```
http://localhost:3000/admin/login
```

**Login with:**
- Email: `admin@aurahouseofflowers.com`
- Password: `changeme123`

---

## 🔍 View Your Data (MongoDB Compass)

If you installed MongoDB Compass:

1. Open **MongoDB Compass**
2. Connection string: `mongodb://localhost:27017`
3. Click **Connect**
4. You'll see your databases:
   - `aura-flowers` → Your app database
   - Collections:
     - `adminusers` → Admin accounts
     - `items` → Your products

---

## 📊 Database Structure

Once you add items, your database will look like:

```
aura-flowers (database)
├── adminusers (collection)
│   └── { email, password, role, createdAt }
│
└── items (collection)
    └── { 
        title, 
        slug, 
        description, 
        images[], 
        collection,
        price,
        dimensions,
        material,
        createdAt,
        updatedAt 
    }
```

---

## 🔄 Switching Between Local & Atlas

### Development → Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/aura-flowers
```

### Production → MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/aura-flowers?retryWrites=true&w=majority
```

**You can switch anytime by updating `.env.local` and restarting the dev server.**

---

## 🛠️ Useful MongoDB Commands

### MongoDB Shell Commands

```bash
# Connect to MongoDB
mongosh

# Show all databases
show dbs

# Use your database
use aura-flowers

# Show collections
show collections

# View all admin users
db.adminusers.find()

# View all items
db.items.find()

# Count items
db.items.countDocuments()

# Delete all items (be careful!)
db.items.deleteMany({})

# Drop entire database (very careful!)
db.dropDatabase()

# Exit shell
exit
```

### Windows Service Commands

```bash
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Restart MongoDB
net stop MongoDB && net start MongoDB

# Check status
Get-Service MongoDB
```

---

## 🐛 Troubleshooting

### "MongoDB service not found"
→ MongoDB wasn't installed as a service. You need to:
1. Reinstall MongoDB with "Install as Service" checked
2. OR manually run: `"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"`

### "Can't connect to MongoDB"
→ Check if service is running:
```bash
Get-Service MongoDB
# If stopped: net start MongoDB
```

### "Connection refused: 27017"
→ MongoDB service didn't start properly. Check:
1. Windows Services → MongoDB → Start
2. Event Viewer for error logs
3. Try manual start: `mongod --dbpath "C:\data\db"`

### "ECONNREFUSED localhost:27017"
→ Your .env.local is not being read:
1. Ensure `.env.local` is in the **root** of `my-app`
2. Restart the dev server (`npm run dev`)
3. Check file name is exactly `.env.local` (not `.env.local.txt`)

---

## 📝 Quick Reference Card

| Task | Command |
|------|---------|
| Install MongoDB | Download from mongodb.com/try/download/community |
| Start Service | `net start MongoDB` |
| Stop Service | `net stop MongoDB` |
| Connect to Shell | `mongosh` |
| Connection String | `mongodb://localhost:27017/aura-flowers` |
| Seed Admin | `npm run seed:admin` |
| View Data | MongoDB Compass → `localhost:27017` |

---

## 🎯 Recommended Workflow

**Development:**
```env
MONGODB_URI=mongodb://localhost:27017/aura-flowers
```

**Testing/Staging:**
```env
MONGODB_URI=mongodb+srv://staging@cluster.mongodb.net/aura-flowers-staging
```

**Production:**
```env
MONGODB_URI=mongodb+srv://prod@cluster.mongodb.net/aura-flowers
```

---

## ✅ Verification Checklist

- [ ] MongoDB installed and service running
- [ ] Can connect with `mongosh`
- [ ] `.env.local` created with local MONGODB_URI
- [ ] `npm install` completed
- [ ] `npm run seed:admin` succeeded
- [ ] Can login at `/admin/login`
- [ ] Can create/edit/delete items
- [ ] Items show on public pages

---

Now you're ready to develop locally with full control! 🚀
