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
        <a href="${process.env.NEXT_PUBLIC_API_URL}" style="text-decoration: none; color: #575656; padding: 8px 0; display: inline-block;">
          <div style="width: 70px; height: 32px; line-height: 16px; letter-spacing: -1.6px; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 24px; max-height: 32px;">
            <div style="text-align: right;">chea<span style="color: #A3EF97;">p</span></div>
            <div style="text-align: right;">wee<span style="color: #A3EF97;">d</span></div>  
          </div>
        </a>
        <div><span>e-mail: </span><a href="mailto:kontakt@cheapweed.pl">kontakt@cheapweed.pl</a></div>
        <a href="www.cheapweed.pl">www.cheapweed.pl</a>
      `
    })
    res.status(200).json({ message: 'Wysłaliśmy maila weryfikującego'})
  } catch (error) {
    res.status(404).json({ message: 'Nie udało się wysłać maila'})
  }

}

export const sendResetPasswordEmail = async (req, res) => {
  const { email, name, id, resetPasswordToken } = req.body

  try {
    const emailToSend = await transporter.sendMail({
      from: 'kontakt@cheapweed.pl', 
      to: email,
      subject: `Reset hasła - Cheap Weed!`,
      html: `
        <h3>Cześć ${name},</h3>
        <p>Przesyłamy link do zresetowania hasła.</p>
        <p>Kliknij poniższy link, aby sfinalizować proces.</p> 
        <p><a href="${process.env.NEXT_PUBLIC_API_URL}/new-password?userId=${id}&token=${resetPasswordToken}">Resetuj hasło</a></p>
        <div>Z poważaniem,</div>
        <a href="${process.env.NEXT_PUBLIC_API_URL}" style="text-decoration: none; color: #575656; padding: 8px 0; display: inline-block;">
          <div style="width: 70px; height: 32px; line-height: 16px; letter-spacing: -1.6px; font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 24px; max-height: 32px;">
            <div style="text-align: right;">chea<span style="color: #A3EF97;">p</span></div>
            <div style="text-align: right;">wee<span style="color: #A3EF97;">d</span></div>  
          </div>
        </a>
        <div><span>e-mail: </span><a href="mailto:kontakt@cheapweed.pl">kontakt@cheapweed.pl</a></div>
        <a href="www.cheapweed.pl">www.cheapweed.pl</a>
      `
    })
    res.status(200).json({ message: 'Wysłaliśmy maila z lnkiem do zmiany hasła'})
  } catch (error) {
    res.status(404).json({ message: 'Nie udało się wysłać maila'})
  }
}