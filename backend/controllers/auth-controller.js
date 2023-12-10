import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

import User from '../models/user'

export const authUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);


    if (validPassword) {
      const accessToken = jwt.sign(
      { id: user.id, email: user.email }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: 86400 }
      );

      const refreshToken = jwt.sign(
      { id: user.id, email: user.email }, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, { expiresIn: 525600 }
      );

      res.setHeader('Set-Cookie', serialize('token', accessToken, { path: '/', httpOnly: true }));

      res.json({ accessToken, refreshToken });

    } else {
      res.json({ message: 'Wrong password' });
    }
  } else {
    res.json({ message: 'Wrong email' });
  }


}

export const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  const user = await User.findOne({ _id: req.body.userId });

  if (!refreshToken) {
    return res.status(401) // Unauthorized
  }

  try {
    await jwt.verify(refreshToken, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET);
  } catch {
    return res.status(403) // forbidden
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.NEXT_PUBLIC_TOKEN_SECRET, { expiresIn: 86400 })

  res.send({ accessToken })
}