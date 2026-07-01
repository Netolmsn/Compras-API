import { Request, Response } from 'express'
import { prisma } from '../database/prisma'
import { GithubService } from '../services/GithubService'

export class ComprasController {
  async store(request: Request, response: Response) {
    const { item_id } = request.body

    if (item_id === undefined || typeof item_id !== 'number') {
      return response.status(400).json({
        message: 'O campo item_id é obrigatório e deve ser numérico.',
      })
    }

    try {
      const compra = await prisma.$transaction(async (transaction) => {
        const item = await transaction.item.findUnique({
          where: {
            id: item_id,
          },
        })

        if (!item) {
          throw new Error('ITEM_NOT_FOUND')
        }

        if (item.qtdAtual <= 0) {
          throw new Error('ITEM_OUT_OF_STOCK')
        }

        const compradorGithubLogin = await GithubService.getRandomUserLogin()

        await transaction.item.update({
          where: {
            id: item.id,
          },
          data: {
            qtdAtual: item.qtdAtual - 1,
          },
        })

        return transaction.compra.create({
          data: {
            itemId: item.id,
            compradorGithubLogin,
          },
          include: {
            item: true,
          },
        })
      })

      return response.status(201).json({
        message: 'Compra criada com sucesso.',
        data: {
          id: compra.id,
          comprador_github_login: compra.compradorGithubLogin,
          item_id: compra.itemId,
          item: {
            id: compra.item.id,
            nome: compra.item.nome,
            preco: compra.item.preco,
            qtd_atual: compra.item.qtdAtual,
          },
          created_at: compra.createdAt,
          updated_at: compra.updatedAt,
        },
      })
    } catch (error) {
      if (error instanceof Error && error.message === 'ITEM_NOT_FOUND') {
        return response.status(404).json({
          message: 'Item não encontrado.',
        })
      }

      if (error instanceof Error && error.message === 'ITEM_OUT_OF_STOCK') {
        return response.status(400).json({
          message: 'Item sem estoque disponível.',
        })
      }

      if (error instanceof Error && error.message === 'GITHUB_API_ERROR') {
        return response.status(502).json({
          message: 'Não foi possível criar a compra porque a API do GitHub está indisponível.',
        })
      }

      return response.status(500).json({
        message: 'Erro interno ao criar compra.',
      })
    }
  }

  async index(request: Request, response: Response) {
    const compras = await prisma.compra.findMany({
      include: {
        item: true,
      },
      orderBy: {
        id: 'desc',
      },
    })

    const formattedCompras = compras.map((compra) => ({
      id: compra.id,
      comprador_github_login: compra.compradorGithubLogin,
      item_id: compra.itemId,
      item: {
        id: compra.item.id,
        nome: compra.item.nome,
        preco: compra.item.preco,
        qtd_atual: compra.item.qtdAtual,
      },
      created_at: compra.createdAt,
      updated_at: compra.updatedAt,
    }))

    return response.json({
      data: formattedCompras,
    })
  }
}