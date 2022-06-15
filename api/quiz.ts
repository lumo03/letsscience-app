import type { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient } from 'mongodb'
import connectToMongo from './_connect'

const quizzes = [{
  id: 1,
  title: 'Mathematik',
  questions: [
    {
      question: '1+2',
      answers: ['1', '2', '3', '4'],
      correctAnswer: 2
    }
  ]
},
{
  id: 2,
  title: 'Geographie',
  questions: [
    {
      question: 'Wie lautet die Hauptstadt von Deutschland',
      answers: ['Berlin', 'Köln', 'Frankfurt', 'Rom'],
      correctAnswer: 0
    }
  ]
}
]

export default async (request: VercelRequest, response: VercelResponse): Promise<void> => {
  const client = await connectToMongo()

  if (request.method === 'GET') {
    await getQuizHandler(request, response, client)
  } else if (request.method === 'POST') {
    await postQuizHandler(request, response, client)
  }
}

const getQuizHandler = async (request: VercelRequest, response: VercelResponse, client: MongoClient): Promise<void> => {
  const { id } = request.query

  if (id instanceof Array) {
    response.status(400)
    return
  }

  const numberId = Number.parseInt(id)
  const quiz = await client.db('app').collection('quizzes').find({ id: numberId }).toArray()
  response.status(200).json(quiz)
}

const postQuizHandler = async (request: VercelRequest, response: VercelResponse, client: MongoClient): Promise<void> => {
  await client.db('app').collection('quizzes').insertMany(quizzes)
  response.status(200).send({})
}
