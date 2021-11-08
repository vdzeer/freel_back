import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    post: '587',
    secure: false,
    auth: {
      user: 'freel2021host@gmail.com',
      pass: 'Freel123456789',
    },
  },
  {
    from: `Bot FreeL`,
  },
)

export const nodemailerService = message => {
  transporter.sendMail(message, (e, info) => {
    if (e) return console.log(e)
  })
}
