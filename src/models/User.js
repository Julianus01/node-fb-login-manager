import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  uid: String,
  email: String,
  displayName: String,
  photoURL: String,
})

export default mongoose.model('User', userSchema)