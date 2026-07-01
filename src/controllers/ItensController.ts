import { Request, Response } from 'express'
import { prisma } from '../database/prisma'

export class ItensController {
  async store(request: Request, response: Response) {
    const { nome, preco, qtd_atual } = request.body

    if (!nome || typeof nome !== 'string') {
      return response.status(400).json({
        message: 'O campo nome é obrigatório e deve ser uma string.',
      })
    }

    if (preco === undefined || typeof preco !== 'number' || preco < 0) {
      return response.status(400).json({
        message: 'O campo preco é obrigatório e deve ser um número maior ou igual a zero.',
      })
    }

    if (qtd_atual === undefined || typeof qtd_atual !== 'number' || qtd_atual < 0) {
      return response.status(400).json({
        message: 'O campo qtd_atual é obrigatório e deve ser um número maior ou igual a zero.',
      })
    }

    const item = await prisma.item.create({
      data: {
        nome,
        preco,
        qtdAtual: qtd_atual,
      },
    })

    return response.status(201).json({
      message: 'Item criado com sucesso.',
      data: {
        id: item.id,
        nome: item.nome,
        preco: item.preco,
        qtd_atual: item.qtdAtual,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      },
    })
  }

  async index(request: Request, response: Response) {
    const itens = await prisma.item.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    const formattedItens = itens.map((item) => ({
      id: item.id,
      nome: item.nome,
      preco: item.preco,
      qtd_atual: item.qtdAtual,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
    }))

    return response.json({
      data: formattedItens,
    })
  }
}