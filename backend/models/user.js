import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Nickname jest wymagany']
  },
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
  refreshToken: { type: String },
  ofAge: { type: Boolean },
  consent: { type: Boolean }
})

export default mongoose.models.User || mongoose.model('User', userSchema)