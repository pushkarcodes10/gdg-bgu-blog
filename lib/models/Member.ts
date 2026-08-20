import mongoose, { Schema, Document, Model } from 'mongoose'
import { MemberRole } from '@/lib/members'

export interface IMemberDocument extends Document {
  id: string
  name: string
  email: string
  role: string
  systemRole: MemberRole
  avatar?: string
  isAllowed: boolean
  createdAt: Date
  updatedAt: Date
}

const MemberSchema: Schema = new Schema<IMemberDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true },
    role: { type: String, required: true, default: 'GDG Member' },
    systemRole: {
      type: String,
      enum: ['admin', 'lead', 'associate', 'member'],
      default: 'member',
    },
    avatar: { type: String },
    isAllowed: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

export const MemberModel: Model<IMemberDocument> =
  mongoose.models.Member || mongoose.model<IMemberDocument>('Member', MemberSchema)
