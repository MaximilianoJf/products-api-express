import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, getUpdateProduct, updateAvailability } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type:
 *              properties:
 *                  id:
 *                      type: integer
 *                      description:  The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: True
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *        - Products 
 *     description: Return a list of products
 *     responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          
 */
router.get('/', getProducts)


/**
 *  @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *         200:
 *             description: Successful Response
 *             content:
 *                 application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Product'
 *         404:
 *             description: Not found
 *         400:
 *             description: Bad Request - Invalid ID
 * 
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Products
 *     description: Crea un producto y devuelve el producto creado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post('/',
    body('name').notEmpty().isString().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor No Valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value=> value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
)



/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     description: Updates a product and returns the updated data
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().isString().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor No Valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value=> value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    getUpdateProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *      summary: Update Product Availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer   
 *      responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     description: Deletes a product and returns the deleted product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: 'Producto Eliminado'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router