import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import './Quiz.css'
import questions from './Data'
const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question,setQuestion] = useState(questions[index]);
    const [lock,setLock] = useState(false);

   const option1 = useRef(null)
   const option2 = useRef(null)
   const option3 = useRef(null)
   const option4 = useRef(null)

    const option_array = [option1,option2,option3,option4];

    const handleNext = () => {
      if (lock) {
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex < questions.length) {
            setQuestion(questions[newIndex]); 
          }
          return newIndex;
        });
    option_array.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("correct", "wrong");
      }
    });
  }
};
    

    const handle= (e,ans)=>{
        if(lock===false) {
            if(question.answer===ans) {
                e.target.classList.add("correct")
            }
            else{
                e.target.classList.add("wrong")
                option_array[question.answer - 1].current.classList.add("correct");
            }
            setLock(true);
        }

    }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr></hr>
      <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={option1} onClick={(e)=> handle(e,1)}>{question.option1}</li>
        <li ref={option2} onClick={(e)=> handle(e,2)}>{question.option2}</li>
        <li ref={option3} onClick={(e)=> handle(e,3)}>{question.option3}</li>
        <li ref={option4} onClick={(e)=> handle(e,4)}>{question.option4}</li>
      </ul>
      <button onClick={handleNext}>Next</button>
      <p className='index'>{index + 1} of {questions.length} Questions</p>
    </div>
  )
}

export default Quiz
