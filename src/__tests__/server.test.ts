import { connectDB } from '../server';
import db from '../config/db';


jest.mock('../config/db')

describe('connectDB', () => {
    it('Should handle database connection error', async () => {
        //si en algún momento del test alguien llama a db.authenticate(), no ejecutes la función real, en su lugar lanza este error
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo ubo un error al conectar la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})