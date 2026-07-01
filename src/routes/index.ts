import { Router } from 'express'
import { ItensController } from '../controllers/ItensController'
import { ComprasController } from '../controllers/ComprasController'

const routes = Router()

const itensController = new ItensController()
const comprasController = new ComprasController()

/**
 * @openapi
 * /:
 *   get:
 *     summary: Verifica se a API está online
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API online
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: API Lista de Compras Aleatórias com Catálogo
 *                 status:
 *                   type: string
 *                   example: online
 */
routes.get('/', (request, response) => {
  return response.json({
    name: 'API Lista de Compras Aleatórias com Catálogo',
    status: 'online',
  })
})

/**
 * @openapi
 * /itens:
 *   post:
 *     summary: Cria um novo item no catálogo
 *     tags:
 *       - Itens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateItemRequest'
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routes.post('/itens', itensController.store)

/**
 * @openapi
 * /itens:
 *   get:
 *     summary: Lista todos os itens cadastrados
 *     tags:
 *       - Itens
 *     responses:
 *       200:
 *         description: Lista de itens cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 */
routes.get('/itens', itensController.index)

/**
 * @openapi
 * /compras:
 *   post:
 *     summary: Cria uma nova compra com comprador aleatório do GitHub
 *     tags:
 *       - Compras
 *     description: Valida o item, consulta a API pública do GitHub, seleciona um usuário aleatório, registra a compra e reduz o estoque do item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompraRequest'
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *       400:
 *         description: Dados inválidos ou item sem estoque
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       502:
 *         description: Falha ao consultar API do GitHub
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routes.post('/compras', comprasController.store)

/**
 * @openapi
 * /compras:
 *   get:
 *     summary: Lista todos os registros de compra
 *     tags:
 *       - Compras
 *     description: Retorna as compras com os dados do item relacionado.
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Compra'
 */
routes.get('/compras', comprasController.index)

export { routes }