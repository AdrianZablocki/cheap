import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { serialize } from 'cookie'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import User from '../models/user'
import { removePassword } from '../utils/remove-password'

dayjs.extend(utc)

const tokenExpires = 86400
const refreshTokenExpires = 525600
const tokenCookieExpires = new Date(Date.now() + (tokenExpires * 1000))
const refreshTokenCookieExpires = new Date(Date.now() + (refreshTokenExpires * 1000))

export const verifyUser = async (req, res) => {
  // TODO check if verificatio link expired
  // const now = Math.floor(Date.now() / 1000)
  // if (now > jwtDecode(req.body.token).exp) {
  //   return res.status(200).json({ message: 'Link aktywacyjny wygasł' })
  // }
  
  try {
    const user = await User.findById(req.body.userId)

    console.log('USER', user, user?.validationToken === req.body.token)
    if (user?.validationToken === req.body.token) {
      console.log('HUJ')
      await User.findOneAndUpdate({ _id: req.body.userId }, { verified: true, validationToken: null }, { new: true })
      return res.status(200).json({ message: 'Konto zostało zweryfikowne poprawnie' })
    } else {
      res.status(404).json({ message: 'Coś z tym linkiem jest nie tak', error })
    }
    
  } catch (error) {
    return res.status(404).json({ message: 'Coś z tym linkiem jest nie tak', error })
  }
}

export const authUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email})

  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (validPassword) {
      if (!user.verified) {
        return res.status(404).json({ message: 'Aby zalogować się i móc w pełni korzystać z serwisu prosimy o zweryfikowanie konta, klikając w link przesłany w mailu'})
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name, isVerified: user.verified }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: tokenExpires }
      )

      const refreshToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name, isVerified: user.verified }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpires }
      )

      await User.findOneAndUpdate({ email: req.body.email }, { refreshToken }, { new: true })
      
      res.setHeader('Set-Cookie', [
        serialize('token', accessToken, { path: '/', httpOnly: true, expires: tokenCookieExpires }),
        serialize('refreshToken', refreshToken, { path: '/', httpOnly: true, expires: refreshTokenCookieExpires })
      ])

      return res.status(200).json({ accessToken, refreshToken })

    } else {
      return res.status(404).json({ message: 'Niepoprawne hasło' })
    }
  } else {
    return res.status(404).json({ message: 'Niepoprawny email' })
  }


}

export const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' }) // Unauthorized
  }

  const verification = jwt.verify(refreshToken, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET)

  try {
    const user = await User.findOne({ email: verification.email })

    if (user) {
      const accessToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name, isVerified: user.verified }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: tokenExpires}
      )

      res.setHeader('Set-Cookie', [
        serialize('token', accessToken, { path: '/', httpOnly: true, expires: tokenCookieExpires })
      ])

      return res.status(200).json({ accessToken })
    }
    
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden' }) // Forbidden
  }

}

export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (user) {
      const resetPasswordToken = jwt.sign(
        { email: req.body.email }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: 86400 }
      );
      const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, { resetPasswordToken }, { new: true })
      const userData = removePassword(updatedUser)
      return res.status(200).json({ userData })
    } else {
      return res.status(404).json({ message: 'Nie znaleziono takiego maila' })
    }
    
  } catch (error) {
    return res.status(500).json({ message: 'Coś poszło nie tak', error })
  }
}
