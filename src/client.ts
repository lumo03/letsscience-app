import axios, { Axios, AxiosInstance } from 'axios'
import { getAuth } from 'firebase/auth'

const getClient = async (): Promise<AxiosInstance> => {
  const token = await getAuth().currentUser?.getIdToken()
  return axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
    headers: {
      Authorization: token ?? ''
    }
  })
}

export interface APIAnswer {
  id: number,
  answer: number,
}

export interface APIQuestion {
  question: string
  answers: APIAnswer[]
  correctAnswer: number
}

export interface APIQuiz {
  _id: string
  id: number
  title: string
  questions: APIQuestion[]
}

const getQuiz = async (id: number): Promise<APIQuiz> => {
  let resp = (await getClient()).get(`api/quiz/${id}`)
  return (await resp).data
}

export { getQuiz }
