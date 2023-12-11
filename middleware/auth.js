import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', requestUrl: req.url })
  }

  jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden', requestUrl: req.url })
    req.user = user
    next()
  })

}