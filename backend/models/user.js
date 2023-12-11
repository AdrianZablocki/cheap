import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: [true, 'Email jest wymagany']
   },
  password: { 
    type: String,
    required: [true, 'Hasło jest wymagane']
  },
  region: { 
    type: String,
    required: [true, 'Region jest wymagany']
  },
  verified: { type: Boolean },
  role: { type: String},
  refreshToken: { type: String }
})

export default mongoose.models.User || mongoose.model('User', userSchema)