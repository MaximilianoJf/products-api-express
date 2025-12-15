import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'

//conectar a base de datos
export async function connectDB()
{
    try{
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold('Conexion exitosa a la BD'))
    }catch(error){
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}

connectDB()

// instancia de express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    
    if (!origin) {
      return callback(null, true)
    }

    const allowedOrigins = [
      process.env.FRONTEND_URL,
    ]

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('CORS bloqueado'))
  }
}

server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)


//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))
export default server