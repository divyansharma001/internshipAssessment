import React, { useState, useEffect } from 'react';

const FeedbackPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        const loadQuestions = async () => {
            const questionList = [
                { id: 1, text: 'How satisfied are you with our products?', type: 'rating', maxRating: 5 },
                { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', maxRating: 5 },
                { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', maxRating: 5 },
                { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', maxRating: 10 },
                { id: 5, text: 'What could we do to improve our service?', type: 'text' }
            ];
            setQuestions(questionList);

            const savedSessionId = localStorage.getItem('sessionId');
            if (savedSessionId) {
                setSessionId(savedSessionId);
            } else {
                const newSessionId = generateSessionId();
                setSessionId(newSessionId);
                localStorage.setItem('sessionId', newSessionId);
            }

            const savedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
            setAnswers(savedAnswers);
        };
        loadQuestions();
    }, []);

    const generateSessionId = () => {
      
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    const handleAnswer = (answer) => {
        const updatedAnswers = { ...answers, [questions[currentQuestionIndex].id]: answer };
        setAnswers(updatedAnswers);
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (questions.length === 0) {
        return <div className="text-center text-xl font-semibold">Loading...</div>;
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">{`Question ${currentQuestionIndex + 1} / ${questions.length}`}</h2>
            <h3 className="text-xl mb-6">{questions[currentQuestionIndex].text}</h3>

            {/* Render input based on question type */}
            {questions[currentQuestionIndex].type === 'rating' && (
                <div className="flex space-x-4 mb-6">
                    {[...Array(questions[currentQuestionIndex].maxRating).keys()].map(rating => (
                        <button
                            key={rating + 1}
                            onClick={() => handleAnswer(rating + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                answers[questions[currentQuestionIndex].id] === rating + 1 
                                ? 'bg-green-500 text-white' 
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            {rating + 1}
                        </button>
                    ))}
                </div>
            )}

            {questions[currentQuestionIndex].type === 'text' && (
                <textarea
                    className="w-full max-w-md p-2 border border-gray-300 rounded-lg mb-6"
                    onBlur={(e) => handleAnswer(e.target.value)}
                    defaultValue={answers[questions[currentQuestionIndex].id] || ''}
                    placeholder="Your answer..."
                />
            )}

            <div className="flex justify-between w-full max-w-md">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded-lg ${
                        currentQuestionIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className={`px-4 py-2 rounded-lg ${
                        currentQuestionIndex === questions.length - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FeedbackPage;
