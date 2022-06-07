import type { VercelRequest, VercelResponse } from '@vercel/node';

const quizzes = [{
  id: 1,
  title: "Mathematik",
  questions: [
    {
      question: "1+2",
      answers: ["1", "2", "3", "4"],
      correctAnswer: 2,
    }
  ]
},
{
  id: 2,
  title: "Geographie",
  questions: [
    {
      question: "Wie lautet die Hauptstadt von Deutschland",
      answers: ["Berlin", "Köln", "Frankfurt", "Rom"],
      correctAnswer: 0,
    }
  ]
}
]

export default (request: VercelRequest, response: VercelResponse) => {
  const { id } = request.query;

  if (id instanceof Array) {
    response.status(400);
    return;
  }

  const number_id = Number.parseInt(id);

  response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .send(JSON.stringify(quizzes[number_id]));
};
