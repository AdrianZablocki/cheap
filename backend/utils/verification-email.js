import nodemailer from 'nodemailer'

const verificationEmail = async( region, email, id ) => {
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
        <a href="${process.env.NEXT_PUBLIC_API_URL}/user/${id}?verified=true">link</a>
      `
    })
  } catch (error) {
    console.log('Mail error', error)    
  }

}

export default verificationEmail
