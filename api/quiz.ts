import type { VercelRequest, VercelResponse } from '@vercel/node'
import connectToMongo from './_connect'

// The main function of the quiz endpoint
export default async (request: VercelRequest, response: VercelResponse): Promise<void> => {
  // Choose the correct handler function based on the HTTP Method
  if (request.method === 'GET') {
    await getQuizHandler(request, response)
  } else if (request.method === 'POST') {
    await postQuizHandler(request, response)
  }
}

const getQuizHandler = async (request: VercelRequest, response: VercelResponse): Promise<void> => {
  const { id } = request.query

  // Ensure that id isn't of type string[]
  if (id instanceof Array) {
    response.status(400)
    return
  }

  // Create a MongoClient
  const client = await connectToMongo()
  // Convert string to int
  const numberId = Number.parseInt(id)
  // Find entry with the specified id in the 'quizzes' collection in the 'app' database
  const quiz = await client.db('app').collection('quizzes').find({ id: numberId }).toArray()
  // Return a JSON response
  response.status(200).json(quiz)
}

const postQuizHandler = async (request: VercelRequest, response: VercelResponse): Promise<VercelResponse> => {
  // Create a MongoClient
  const client = await connectToMongo()

  // Parse the body as JSON
  let quiz;
  try {
    quiz = request.body;
  } catch {
    return response.status(400).json({ error: 'Malformed JSON' });
  }

  // Insert the quiz into MongoDB
  const res = await client.db('app').collection('quizzes').insertOne(quiz)
  if (res.acknowledged) {
    return response.status(200).send({})
  } else {
    return response.status(500).send({})
  }
}
