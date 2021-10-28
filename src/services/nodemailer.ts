import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    post: '587',
    secure: false,
    auth: {
      user: 'robinson2ryan2@gmail.com',
      pass: 'Qwerty123456$',
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
