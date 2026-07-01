import swaggerJsdoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Lista de Compras Aleatórias com Catálogo',
      version: '1.0.0',
      description:
        'API REST para gerenciamento de catálogo de itens e registro de compras com comprador aleatório obtido da API pública do GitHub.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor local',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Verificação de status da API',
      },
      {
        name: 'Itens',
        description: 'Gerenciamento do catálogo de itens',
      },
      {
        name: 'Compras',
        description: 'Gerenciamento de compras aleatórias',
      },
    ],
    components: {
      schemas: {
        Item: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            nome: {
              type: 'string',
              example: 'Notebook',
            },
            preco: {
              type: 'number',
              example: 3500.9,
            },
            qtd_atual: {
              type: 'integer',
              example: 5,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        CreateItemRequest: {
          type: 'object',
          required: ['nome', 'preco', 'qtd_atual'],
          properties: {
            nome: {
              type: 'string',
              example: 'Notebook',
            },
            preco: {
              type: 'number',
              example: 3500.9,
            },
            qtd_atual: {
              type: 'integer',
              example: 5,
            },
          },
        },
        Compra: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            comprador_github_login: {
              type: 'string',
              example: 'mojombo',
            },
            item_id: {
              type: 'integer',
              example: 1,
            },
            item: {
              $ref: '#/components/schemas/Item',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        CreateCompraRequest: {
          type: 'object',
          required: ['item_id'],
          properties: {
            item_id: {
              type: 'integer',
              example: 1,
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Mensagem de erro.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
})