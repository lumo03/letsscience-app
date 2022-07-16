import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
import { quizRouter } from './quiz'

const app = express()

app.use(cors())

app.get('/api/helloWorld', (req, res) => {
  res.json({
    message: 'Hello, World!'
  })
})

app.use(quizRouter)

const api = functions.https.onRequest(app)

export { api }
