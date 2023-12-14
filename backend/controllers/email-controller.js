import nodemailer from 'nodemailer'

export const sendVerificationEmail = async (req, res) => {
  const { email, region, id } = req.body
  const user = process.env.NEXT_PUBLIC_USER
  const pass = process.env.NEXT_PUBLIC_PASSWORD

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  })

  try {
    // TODO add stylish email template
    const emailToSend = await transporter.sendMail({
      // TODO add irganization email from: 'info@cheap-weed.pl', 
      to: email,
      subject: `Zweryfikuj konto załozone na cheap weed`,
      html: `
        <p>Region: ${region}</p>
        <p>Email: ${email}</p>
        <a href="${process.env.NEXT_PUBLIC_API_URL}/verified?user=${email}">link</a>
      `
    })

    console.log(emailToSend.messageId, emailToSend.accepted);
    res.status(200).json({ message: 'Wysłaliśmy meila weryfikacyjneg'})
  } catch (error) {
    console.log('Mail error', error)
    res.status(404).json({ message: 'Nie udało się wysłać maila'})
  }

}