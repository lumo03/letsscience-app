import { useEffect, useState } from "react";
import style from './style.css';
import ky from "ky-universal";

const Quiz = ({id}) => {

    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        ky.get(`/api/quiz?id=${id}`)
            .json()
            .then((resp) => {
                console.log(resp)
                setQuiz(resp)
            })
    }, [id])

    if (quiz == null) {
        return <h1>Loading Quiz</h1>
    }

    return <div className={style.profile}>
        <h1>{quiz.title}</h1>
        {quiz.questions.map((question, index) => 
            <Question questionData={question} />
        )}
    </div>
}

const Question = ({ questionData }) => {
    const {question, answers, correctAnswer} = questionData;
    const [answerText, setAnswerText] = useState('Please select an answer!')

    const validateAnswer = (answerId) => {
        if (answerId == correctAnswer) {
            setAnswerText('Correct!')
        } else {
            setAnswerText(`False! The correct answer is: ${answers[correctAnswer]}`)
        }
    }
    
    return <>
        <h5>{question}</h5>
        {answers.map((answer, index) => 
            <button onClick={() => validateAnswer(index)}>{answer}</button>
        )}
        <p>{answerText}</p>
    </>
}

export default Quiz;