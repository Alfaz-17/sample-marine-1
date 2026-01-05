import Link from 'next/link'
import mongoose, { Schema, Document, Model } from 'mongoose'
import { COLLECTIONS, type CollectionType } from '../item-types'

export { COLLECTIONS, type CollectionType }


export interface IItem extends Document {
  title: string
  slug: string
  description: string
  images: string[]
  collection: CollectionType
  price?: number
  dimensions?: string
  material?: string
  createdAt: Date
  updatedAt: Date
}

const ItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    collection: {
      type: String,
      required: [true, 'Collection is required'],
      enum: COLLECTIONS,
    },
    price: {
      type: Number,
    },
    dimensions: {
      type: String,
    },
    material: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Create index for faster queries
ItemSchema.index({ collection: 1, createdAt: -1 })
ItemSchema.index({ slug: 1 })

// Prevent model recompilation during hot reload
const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema)

export default Item
