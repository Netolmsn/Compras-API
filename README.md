# API Lista de Compras Aleatórias com Catálogo

Projeto desenvolvido como avaliação técnica para vaga de Desenvolvedor(a) Backend.

## Autor

Mugiwara Kazoku

## Descrição

Esta API REST permite cadastrar itens em um catálogo e registrar compras aleatórias.

Ao criar uma nova compra, o cliente informa o `item_id`. A aplicação valida se o item existe e possui estoque disponível, consulta a API pública do GitHub, seleciona um usuário aleatório, registra a compra no banco de dados e reduz o estoque do item comprado.

## Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Axios
- Swagger/OpenAPI

## Requisitos

- Node.js 20+
- npm

## Instalação

Clone o projeto:

```bash
git clone https://github.com/Netolmsn/Compras-API.git
cd compras-api