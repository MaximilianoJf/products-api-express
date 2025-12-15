import server from "./server";
import colors from 'colors'


// ver si existe esa variable o asignalo al puero 4000
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(colors.cyan.bold(`Rest API en el puerto ${port}`))
})