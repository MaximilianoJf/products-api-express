import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + '/../models/**/*.ts'],
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {},
  logging: false
})

export default db