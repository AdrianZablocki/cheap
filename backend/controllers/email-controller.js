import nodemailer from 'nodemailer'

const user = process.env.NEXT_PUBLIC_USER
const pass = process.env.NEXT_PUBLIC_PASSWORD

const transporter = nodemailer.createTransport({
  host: 'serwer2343321.home.pl', // 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user, pass }
})

export const sendVerificationEmail = async (req, res) => {
  const { email, name, id, validationToken } = req.body

  try {
    // TODO add stylish email template
    const emailToSend = await transporter.sendMail({
      from: 'kontakt@cheapweed.pl', 
      to: email,
      subject: `Potwierdzenie Rejestracji Konta - Cheap Weed!`,
      html: `
        <h3>Cześć ${name},</h3>
        <p>Cieszymy się, że chcesz dołączyć do społeczności Cheap Weed!</p>
        <p>Dziękujemy za zaufanie, wierzymy, że tylko wspólne działania będą mieć pozytywny wpływ na zmiany  rynku medycznej marihuany w Polsce.</p>
        <p>Kliknij poniższy link, aby sfinalizować proces rejestracji i uzyskać dostęp do wszystkich funkcji platformy.</p> 
        <p><a href="${process.env.NEXT_PUBLIC_API_URL}/verified?userId=${id}&token=${validationToken}">Aktywuj konto w Cheap Weed</a></p>
        <div>Z poważaniem,</div>
        <p>
          <a href="${process.env.NEXT_PUBLIC_API_URL}" style="text-decoration: none; color: #575656; padding: 8px 0;">
            <div style="width: 70px; line-height: 16px; letter-spacing: -1.6px; font-family: 'Montserrat',sans-serif; font-weight:600;font-size: 24px;">
              <div style="text-align: right;">chea<span style="color: #A3EF97;">p</span></div>
              <div style="text-align: right;">wee<span style="color: #A3EF97;">d</span></div>  
            </div>
          </a>
        </p>  
        <p>Zespół Cheap Weed</p>
        <div>
          <span>e-mail: </span><a href="mailto:kontakt@cheapweed.pl">kontakt@cheapweed.pl</a>
        </div>
        <a href="www.cheapweed.pl">www.cheapweed.pl</a>
      `
    })
    res.status(200).json({ message: 'Wysłaliśmy meila weryfikacyjneg'})
  } catch (error) {
    res.status(404).json({ message: 'Nie udało się wysłać maila'})
  }

}




{/* <p>Region: ${region}</p>
        <p>Email: ${email}</p>
        <a href="${process.env.NEXT_PUBLIC_API_URL}/verified?userId=${id}&token=${validationToken}">link</a> */}