import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  author: {
    type: String
  },
  date: {
    type: Date
  },
  strainName: {
    type: String,
    required: [true, 'Nazwa suszu jest polem wymaganym']
  },
  name: {
    type: String,
    required: [true, 'Nazwa apteki jest polem wymaganym']
  },
  region: {
    type: String,
    required: [true, 'Województwo jest polem wymaganym']
  },
  city: {
    type: String,
    required: [true, 'Miasto jest polem wymaganym']
  },
  address: {
    type: String,
    required: [true, 'Adres apteki jest polem wymaganym']
  },
  contact: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Cena jest polem wymaganym']
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  isValid: {
    type: Boolean
  },
  confirmationCount: {
    type: Number
  },
  searchedFields: {
    type: String
  }
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)
