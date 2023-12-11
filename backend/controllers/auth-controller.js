import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

import User from '../models/user'

const tokenExpires = 86400
const refreshTokenExpires = 525600
const tokenCookieExpires = new Date(Date.now() + (tokenExpires * 1000))
const refreshTokenCookieExpires = new Date(Date.now() + (refreshTokenExpires * 1000))

export const authUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (validPassword) {
      const accessToken = jwt.sign(
        { id: user.id, email: user.email }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: tokenExpires }
      );

      const refreshToken = jwt.sign(
        { id: user.id, email: user.email }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpires }
      );

      await User.findOneAndUpdate({ email: req.body.email }, { refreshToken }, { new: true })
      
      res.setHeader('Set-Cookie', [
        serialize('token', accessToken, { path: '/', httpOnly: true, expires: tokenCookieExpires }),
        serialize('refresToken', refreshToken, { path: '/', httpOnly: true, expires: refreshTokenCookieExpires })
      ])

      res.status(200).json({ accessToken, refreshToken })

    } else {
      res.status(404).json({ message: 'Wrong password' })
    }
  } else {
    res.status(404).json({ message: 'Wrong email' })
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
        { id: user.id, email: user.email }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: 86400 }
      )

      res.setHeader('Set-Cookie', [
        serialize('token', accessToken, { path: '/', httpOnly: true, expires: tokenCookieExpires })
      ])

      res.status(200).json({ accessToken })
    }
    
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' }) // Forbidden
  }

}