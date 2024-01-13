import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import Post from '../models/post'
import { removePassword } from '../utils/remove-password'

const saltRounds = 12

export const createUser = async (req, res) => {

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    bcrypt.hash(req.body.password, saltRounds, async (err,   hash) => {
      try {
        const validationToken = jwt.sign(
          { email: req.body.email, name: req.body.name }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: 86400 }
        );
        const user = await User.create({ ...req.body, password: hash, validationToken})
        const userData = removePassword(user)
        
        return res.status(201).json({ message: 'Konto zostało utworzone', userData })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
      }
    })
  } else {
    return res.status(409).json({ message: `Użytkownik: ${req.body.email} istnieje` })
  }
}

export const getUser = async (req, res) => {
  const user = await User.findById(req.query.id)
  const posts = await Post.find({ authorId: req.query.id}).exec()

  try {
    const userData = { ...removePassword(user), posts }

    return user
    ? res.status(200).json({ user: userData })
    : res.status(404).json({ message: 'Nieznaleziono konta' })

  } catch (error) {
    return res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.query.id, req.body)

    if (!user) {
      res.status(404).json({ error: 'Account not found' })
    }
    
    res.status(200).json({ success: 'Account updated' })    
  } catch (error) {
    res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.query.id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ success: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    const updatedUsers = users.map(user => {
      const updatedUser = removePassword(user)
      return updatedUser
    })
    return res.json(updatedUsers)
  } catch (error) {
    return res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
  }
}
