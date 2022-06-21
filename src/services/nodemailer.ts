import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    post: '587',
    secure: false,
    auth: {
      user: 'ternake58@gmail.com',
      pass: '12345678Aa@',
    },
  },
  {
    from: `Bot`,
  },
)

export const nodemailerService = message => {
  transporter.sendMail(message, (e, info) => {
    if (e) return console.log(e)
  })
}
