import {exit} from 'node:process'
import db from '../config/db'

const clearBD = async () => {
    
    try {
        await db.sync({force:true})
        console.log('Datos eliminados correctamente')
        exit(0)
    }catch(error){
        console.log(error)
        exit(1) //si se le omite codigo o se usa 0 finaliza el programa con exit (lo hizo bien) si se pone uno finaliza con errores
    }

}

// codigo desde comando
if(process.argv[2] === '--clear'){
    clearBD()
}

console.log(process.argv)