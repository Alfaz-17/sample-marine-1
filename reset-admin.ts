import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()
import bcrypt from 'bcryptjs'

async function resetAdmin() {
  try {
    const connectDB = (await import('./lib/db')).default
    const AdminUser = (await import('./lib/models/AdminUser')).default

    await connectDB()

    const email = 'admin@aurahouseofflowers.com'
    const password = 'changeme123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await AdminUser.findOneAndUpdate(
      { email },
      { password: hashedPassword, role: 'admin' },
      { new: true, upsert: true }
    )

    console.log('✓ Admin user reset successfully!')
    console.log('Email:', admin.email)
    console.log('New Password:', password)
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

resetAdmin()
