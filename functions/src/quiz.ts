import * as express from 'express'
import { isLoggedIn } from './auth'
import { store } from './initFirestore'
const router = express.Router() // eslint-disable-line max-len

router.get('/api/quiz/:id', isLoggedIn, (req, resp): void => {
  const parsed = parseInt(req.params.id)

  if (isNaN(parsed)) {
    resp.status(400).send()
    return
  }

  if (parsed < 0) {
    resp.status(422).send()
    return
  }

  store
    .collection('quizzes')
    .where('id', '==', parseInt(req.params.id))
    .get()
    .then((query) => {
      if (!query.empty) {
        const snapshot = query.docs[0]
        const data = snapshot.data()
        resp.json(data)
      } else {
        resp.status(404).send()
      }
    })
    .catch(() => resp.status(500).send())
})

interface QuizAnswer {
  id: string
  answer: string
}

interface QuizQuestion {
  id: string
  question: string
  answers: QuizAnswer[]
  correctAnswer: string
}

router.post('/api/quiz', (req, resp) => {
  const body = req.body as QuizQuestion
  store.collection('quizzes').add(body)
    .then(() => resp.status(200).send())
    .catch(() => resp.status(500).send())
})

router.delete('/api/quiz', (req, resp) => {
  store.collection('quizzes')
})

export { router as quizRouter }
