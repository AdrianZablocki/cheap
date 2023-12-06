import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  author: {
    type: String
  },
  date: {
    type: Date
  },
  name: {
    type: String,
    required: [true, 'Nazwa suszu jest polem wymaganym']
  },
  region: {
    type: String,
    required: [true, 'Województwo jest polem wymaganym']
  },
  city: {
    type: String,
    required: [true, 'Miasto jest polem wymaganym']
  },
  adress: {
    type: String,
    required: [true, 'Adres apteki jest polem wymaganym']
  },
  price: {
    type: Number,
    required: [true, 'Cena jest polem wymaganym']
  }
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)
