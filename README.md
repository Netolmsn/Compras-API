Claro. Use este `README.md` completo para o projeto **Compras-API**, seguindo o estilo do exemplo que você mandou:

````md
# API Lista de Compras Aleatórias com Catálogo

Uma API REST desenvolvida em **Node.js**, **TypeScript**, **Express**, **Prisma ORM** e **SQLite**.

O projeto foi construído para gerenciar um catálogo de itens e registrar compras aleatórias. A cada nova compra, a aplicação consulta a API pública do GitHub, seleciona um usuário aleatório e registra esse usuário como comprador do item escolhido.

A API foi estruturada seguindo uma organização inspirada no padrão **MVC**, separando responsabilidades entre rotas, controllers, services, camada de banco de dados e documentação.

---

## Stack Tecnológica

* **Runtime:** Node.js
* **Linguagem:** TypeScript
* **Framework HTTP:** Express
* **ORM:** Prisma
* **Banco de Dados:** SQLite
* **Cliente HTTP:** Axios
* **Documentação:** Swagger/OpenAPI
* **Gerenciamento de Variáveis:** dotenv

---

## Como Rodar o Projeto

Siga os passos abaixo para instalar as dependências e executar a aplicação localmente.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** versão 20.x ou superior
* **npm**

---

### Passos para Execução

#### 1. Clonar o repositório

```bash
git clone https://github.com/Netolmsn/Compras-API.git
```

#### 2. Acessar a pasta do projeto

```bash
cd Compras-API
```

#### 3. Instalar as dependências

```bash
npm install
```

#### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

Exemplo:

```env
DATABASE_URL="file:./dev.db"
PORT=3333
GITHUB_USERS_API="https://api.github.com/users"
```

#### 5. Executar as migrations

```bash
npx prisma migrate dev
```

#### 6. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

#### 7. Acessar a API

A API estará disponível em:

```text
http://localhost:3333
```

A documentação Swagger estará disponível em:

```text
http://localhost:3333/api-docs
```

---

## Documentação Swagger

A aplicação possui documentação interativa utilizando Swagger/OpenAPI.

Após iniciar o servidor, acesse:

```text
http://localhost:3333/api-docs
```

Na interface do Swagger é possível visualizar e testar todos os endpoints da API.

---

## Destaques Técnicos

Este projeto demonstra a aplicação prática de boas práticas em desenvolvimento backend:

* Separação clara de responsabilidades entre rotas, controllers, services e banco de dados.
* Uso de Prisma ORM para modelagem, migrations e relacionamento entre tabelas.
* Integração com API externa usando Axios.
* Documentação interativa com Swagger/OpenAPI.
* Tratamento de erros para cenários esperados da aplicação.
* Uso de transação no fluxo de compra para manter consistência entre registro de compra e atualização de estoque.
* Estrutura simples, objetiva e fácil de executar localmente.

---

## Licença

Este projeto foi desenvolvido exclusivamente para fins de avaliação técnica.

````

