import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  uid: { type: String, required: true },
  displayName: String,
  email: String,
  phoneNumber: String,
  photoURL: String,
  providerId: { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  isAnonymous: { type: Boolean, required: true },
  metadata: {
    creationTime: String,
    lastSignInTime: String,
  },
  providerData: [
    {
      uid: { type: String, required: true },
      providerId: { type: String, required: true },
      displayName: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      photoURL: { type: String, required: true },
    }
  ],
  refreshToken: { type: String, required: true },
})

export default mongoose.model('User', userSchema)