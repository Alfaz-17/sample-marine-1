import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()
import connectDB from './lib/db'
import AdminUser from './lib/models/AdminUser'

async function checkHash() {
  try {
    await connectDB()
    console.log('Script DB URI:', process.env.MONGODB_URI)
    
    const admin = await AdminUser.findOne({ email: 'admin@aurahouseofflowers.com' })
    if (admin) {
      console.log('Script found Admin ID:', admin._id)
      console.log('Script found Hash:', admin.password)
      console.log('Script found Hash length:', admin.password.length)
    } else {
      console.log('Script: Admin not found')
    }
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

checkHash()
