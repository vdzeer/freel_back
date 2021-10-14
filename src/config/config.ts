export const config = {
  PORT: process.env.PORT || 5005,
  HOST: process.env.PORT || 'https://',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://freel-back.herokuapp.com/',

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:5005/*;',

  CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 0 * * *',

  JWT_SECRET: process.env.JWT_SECRET || 'asdasdf87sfga&@GQW@&dGA&d',

  serverRateLimits: {
    period: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000,
  },
  MONGODB_URL:
    process.env.MONGODB_URL ||
    'mongodb+srv://freel:makSEMENko@cluster0.wga2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

  ROOT_EMAIL: process.env.ROOT_EMAIL || '',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '',
  ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'mail',
}
