import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAdminUser extends Document {
  email: string
  password: string
  role: string
  createdAt: Date
}

const AdminUserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Prevent model recompilation during hot reload
const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema)

export default AdminUser
