import dotenv from 'dotenv'
import path from 'path'
import readline from 'readline'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import AdminUser from '../lib/models/AdminUser'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env or .env.local')
  process.exit(1)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

async function setAdminUser() {
  try {
    console.log('\n🔐 Set Admin Credentials 🔐\n')
    
    // Connect to MongoDB
    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGODB_URI!)
      console.log('Connected to MongoDB.\n')
    }

    const email = await question('Enter new Admin Email: ')
    const password = await question('Enter new Admin Password: ')

    if (!email || !password) {
      console.error('Error: Email and Password are required.')
      process.exit(1)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if admin exists
    const existingAdmin = await AdminUser.findOne({ role: 'admin' })

    if (existingAdmin) {
      existingAdmin.email = email
      existingAdmin.password = hashedPassword
      await existingAdmin.save()
      console.log(`\n✅ Success! Admin user updated.`)
      console.log(`Email: ${email}`)
      console.log(`Password: [Hidden]`)
    } else {
      await AdminUser.create({
        email,
        password: hashedPassword,
        role: 'admin'
      })
      console.log(`\n✅ Success! New admin user created.`)
    }

    console.log('\nYou can now login at /admin/login\n')

  } catch (error) {
    console.error('Error setting admin user:', error)
  } finally {
    rl.close()
    await mongoose.disconnect()
    process.exit(0)
  }
}

setAdminUser()
