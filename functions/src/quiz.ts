import * as express from "express"
import { store } from "./initFirestore"
const router = express.Router()

router.get('/api/quiz/:id', async (req, resp) => {
    let query = await store.collection('quizzes').where("id", "==", req.params.id).get()
    if (!query.empty) {
        const snapshot = query.docs[0]
        const data = snapshot.data()
        resp.json(data)
    }
    resp.status(404).send()
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

router.post('/api/quiz', async (req, resp) => {
    let body = <QuizQuestion>req.body
    try {
        await store.collection('quizzes').add(body)
        resp.status(200).send()
    } catch {
        resp.status(500).send()
    }
})

export {router as quizRouter}