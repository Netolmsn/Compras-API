import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { routes } from './routes'
import { swaggerSpec } from './docs/swagger'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(routes)

const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Swagger docs running on http://localhost:${port}/api-docs`)
})