import React, { useState, useEffect } from 'react';
import FinalPage from '../FinalPage/FinalPage';

const FeedbackPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSurveyComplete, setIsSurveyComplete] = useState(false);

   
    useEffect(() => {
        const loadQuestions = () => {
            const questionList = [
                { id: 1, text: 'How satisfied are you with our products?', type: 'rating', maxRating: 5 },
                { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', maxRating: 5 },
                { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', maxRating: 5 },
                { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', maxRating: 10 },
                { id: 5, text: 'What could we do to improve our service?', type: 'text' }
            ];
            setQuestions(questionList);
        };
        loadQuestions();
    }, []);

    const handleAnswer = (answer) => {
        const updatedAnswers = { ...answers, [questions[currentQuestionIndex].id]: answer };
        setAnswers(updatedAnswers);
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const confirmSubmit = window.confirm('Do you want to submit the survey?');
            if (confirmSubmit) {
                submitSurvey();
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const submitSurvey = () => {
      
        localStorage.setItem('surveyStatus', 'COMPLETED');
        setIsSurveyComplete(true);

        setTimeout(() => {
            setIsSurveyComplete(false);
            setCurrentQuestionIndex(0);
            setAnswers({});
            localStorage.removeItem('answers');
        }, 5000);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (isSurveyComplete) {
        return <FinalPage/>
    }

    return (
        <div className='bg-[#F7EFE5] h-screen'>
        <div className='flex justify-center align-middle pt-44'>
        <div className="p-4">
            <h2 className="text-lg font-semibold pb-5">{`Question ${currentQuestionIndex + 1} / ${questions.length}`}</h2>
            <h3 className="text-xl mb-4">{questions[currentQuestionIndex].text}</h3>

            {questions[currentQuestionIndex].type === 'rating' && (
                <div className="flex space-x-2 gap-9 pt-6">
                    {[...Array(questions[currentQuestionIndex].maxRating).keys()].map(rating => (
                        <button
                            key={rating + 1}
                            onClick={() => handleAnswer(rating + 1)}
                            className={`px-3 py-2 rounded ${answers[questions[currentQuestionIndex].id] === rating + 1 ? 'bg-[#674188] text-white' : 'bg-gray-200'}`}
                        >
                            {rating + 1}
                        </button>
                    ))}
                </div>
            )}

            {questions[currentQuestionIndex].type === 'text' && (
                <textarea
                    onBlur={(e) => handleAnswer(e.target.value)}
                    defaultValue={answers[questions[currentQuestionIndex].id] || ''}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            )}

            <div className="flex space-x-2 mt-4 pt-5 gap-44">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-[#C8A1E0] rounded"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-[#C8A1E0] rounded"
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
        </div>
        
        </div>
    );
};

export default FeedbackPage;
