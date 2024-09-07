import React, { useState, useEffect } from 'react';
import FinalPage from '../FinalPage/FinalPage';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSurveyComplete, setIsSurveyComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadQuestions = () => {
            const questionList = [
                { id: 1, text: 'How satisfied are you with our products?', type: 'rating', maxRating: 5 },
                { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', maxRating: 5 },
                { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', maxRating: 5 },
                { id: 4, text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating', maxRating: 10 },
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
        const currentQuestion = questions[currentQuestionIndex];
        const answerProvided = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '';

        if (currentQuestion.type === 'rating' && !answerProvided) {
            alert('Please provide a rating before proceeding');
            return;
        }

        if (currentQuestion.type === 'text' && !answerProvided) {
            alert('Please provide an answer before ahead.');
            return;
        }

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

    const handleSkip = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const confirmSubmit = window.confirm('Do you want to submit the survey?');
            if (confirmSubmit) {
                submitSurvey();
            }
        }
    };

    const submitSurvey = () => {
        localStorage.setItem('surveyStatus', 'COMPLETED');
        setIsSurveyComplete(true);

        setTimeout(() => {
            setIsSurveyComplete(false);
            setCurrentQuestionIndex(0);
            setAnswers({});
            navigate('/');
            localStorage.removeItem('answers');
        }, 5000);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (isSurveyComplete) {
        return <FinalPage />;
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className='bg-[#F7EFE5] h-screen'>
            <div className='flex justify-center items-center pt-12 md:pt-20'>
                <div className="p-4 md:w-3/4 lg:w-1/2 xl:w-1/3">
                    <h2 className="text-lg md:text-xl font-semibold pb-5">{`Question ${currentQuestionIndex + 1} / ${questions.length}`}</h2>
                    <h3 className="text-md md:text-lg mb-4">{questions[currentQuestionIndex].text}</h3>

                    {questions[currentQuestionIndex].type === 'rating' && (
                        <div className="grid grid-cols-5 gap-2 md:gap-4 pt-6">
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
                            rows="4"
                        />
                    )}

                    <div className="mt-4">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200 uppercase last:mr-0 mr-1">
                                    Progress
                                </div>
                                <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200 uppercase last:mr-0 mr-1">
                                    {Math.round(progress)}%
                                </div>
                            </div>
                            <div className="relative flex flex-col w-full rounded-lg">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200 uppercase last:mr-0 mr-1">
                                        {`Question ${currentQuestionIndex + 1}`}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full bg-gray-200 rounded-lg">
                                    <div
                                        className="relative flex flex-col h-2 rounded-lg bg-teal-600"
                                        style={{ width: `${progress}%` }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 pt-5">
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
                        <button
                            onClick={handleSkip}
                            className="px-4 py-2 bg-[#C8A1E0] rounded"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
