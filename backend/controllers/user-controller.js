import bcrypt from 'bcrypt'

import User from '../models/user'
import verificationEmail from '../utils/verification-email'

const saltRounds = 12

export const createUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    bcrypt.hash(req.body.password, saltRounds, async (err,   hash) => {
      try {
        const user = await User.create({ ...req.body, password: hash})

        if (user) {
          await verificationEmail(req.body.region, req.body.email, user._id)
        }

        const userData = { ...user._doc }
        delete userData.password
        
        res.status(201).json({ message: 'Konto zostało utworzone', userData })
      } catch (error) {
        res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
      }
    })
  } else {
    res.status(409).json({ message: `Urytkownik: ${req.body.email} istnieje` })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.id)
    user ? res.json(user) : res.status(404).json({ message: 'Nieznaleziono konta' })
  } catch (error) {
    res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
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
      const updatedUser = {
        id: user._id,
        email: user.email,
        verified: user.verified,
        role: user.role
      }
      return updatedUser
    })
    res.json(updatedUsers)
  } catch (error) {
    res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
  }
}
