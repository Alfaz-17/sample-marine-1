import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()
import bcrypt from 'bcryptjs'

async function seedAdminUser() {
  try {
    // Dynamic imports ensure environment variables are loaded first
    const connectDB = (await import('../lib/db')).default
    const AdminUser = (await import('../lib/models/AdminUser')).default

    await connectDB()

    const email = process.env.ADMIN_EMAIL || 'admin@aurahouseofflowers.com'
    const password = process.env.ADMIN_PASSWORD || 'changeme123'

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email })

    if (existingAdmin) {
      console.log('✓ Admin user already exists:', email)
      process.exit(0)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = await AdminUser.create({
      email,
      password: hashedPassword,
      role: 'admin',
    })

    console.log('✓ Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('\n⚠️  IMPORTANT: Change the password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin user:', error)
    process.exit(1)
  }
}

seedAdminUser()
