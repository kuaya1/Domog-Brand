'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
    CulturalQuestion, 
    CULTURAL_QUESTIONS,
    PatronPassageSession,
    calculateCulturalResonanceScore,
    scoreOpenEndedAnswer,
    AccessTier
} from '@/lib/fair-launch';

interface PatronPassageProps {
    dropId: string;
    productName: string;
    onComplete: (accessTier: AccessTier, sessionId: string) => void;
}

/**
 * THE PATRON'S PASSAGE
 * 
 * This is not a CAPTCHA. It is a ritual.
 * The design language must feel like being welcomed into a private salon,
 * not like proving you're not a robot.
 */

export default function PatronPassage({ dropId, productName, onComplete }: PatronPassageProps) {
    const [stage, setStage] = useState<'welcome' | 'passage' | 'result'>('welcome');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, { answer: string; score: number; time: number }>>({});
    const [startTime, setStartTime] = useState<number | null>(null);
    const [result, setResult] = useState<{
        score: number;
        tier: AccessTier;
        feedback: string;
    } | null>(null);
    
    // Select 5 questions: 2 accessible, 2 intermediate, 1 deep
    const [selectedQuestions] = useState(() => selectQuestions());
    
    function selectQuestions(): CulturalQuestion[] {
        const accessible = CULTURAL_QUESTIONS.filter(q => q.difficulty === 'accessible');
        const intermediate = CULTURAL_QUESTIONS.filter(q => q.difficulty === 'intermediate');
        const deep = CULTURAL_QUESTIONS.filter(q => q.difficulty === 'deep-knowledge');
        
        return [
            ...shuffleArray(accessible).slice(0, 2),
            ...shuffleArray(intermediate).slice(0, 2),
            ...shuffleArray(deep).slice(0, 1)
        ];
    }
    
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    
    const handleAnswer = useCallback((answer: string) => {
        if (!currentQuestion || !startTime) return;
        
        const timeSpent = (Date.now() - startTime) / 1000;
        
        // Calculate score for this answer
        let score = 0;
        if (currentQuestion.options) {
            const selectedOption = currentQuestion.options.find(o => o.id === answer);
            if (selectedOption?.isCorrect) {
                score = 100;
            } else if (selectedOption?.partialCredit) {
                score = selectedOption.partialCredit * 100;
            }
        } else if (currentQuestion.expectedThemes) {
            score = scoreOpenEndedAnswer(answer, currentQuestion.expectedThemes);
        }
        
        // Penalize suspiciously fast answers
        if (timeSpent < currentQuestion.minimumResponseTime * 0.5) {
            score = score * 0.5;
        }
        
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: { answer, score, time: timeSpent }
        }));
        
        // Move to next question or complete
        if (currentQuestionIndex < selectedQuestions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setStartTime(Date.now());
        } else {
            // Calculate final result
            calculateResult();
        }
    }, [currentQuestion, startTime, currentQuestionIndex, selectedQuestions.length]);
    
    const calculateResult = () => {
        const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0) / selectedQuestions.length;
        
        let tier: AccessTier;
        let feedback: string;
        
        if (totalScore >= 90) {
            tier = 'patron';
            feedback = 'You understand us deeply. Welcome to the inner circle.';
        } else if (totalScore >= 70) {
            tier = 'enthusiast';
            feedback = 'Your appreciation for our craft shines through.';
        } else if (totalScore >= 50) {
            tier = 'newcomer';
            feedback = 'You\'re beginning to know us. We invite you to explore further.';
        } else {
            tier = 'waitlist';
            feedback = 'Thank you for your interest. Perhaps we\'ll know each other better soon.';
        }
        
        setResult({ score: Math.round(totalScore), tier, feedback });
        setStage('result');
    };
    
    const startPassage = () => {
        setStage('passage');
        setStartTime(Date.now());
    };
    
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {stage === 'welcome' && (
                    <WelcomeStage 
                        productName={productName} 
                        onStart={startPassage} 
                    />
                )}
                
                {stage === 'passage' && currentQuestion && (
                    <QuestionStage
                        question={currentQuestion}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={selectedQuestions.length}
                        onAnswer={handleAnswer}
                        previousAnswer={answers[currentQuestion.id]?.answer}
                    />
                )}
                
                {stage === 'result' && result && (
                    <ResultStage
                        result={result}
                        onContinue={() => onComplete(result.tier, `session-${Date.now()}`)}
                    />
                )}
            </div>
        </div>
    );
}

// ============================================================================
// STAGE COMPONENTS
// ============================================================================

function WelcomeStage({ 
    productName, 
    onStart 
}: { 
    productName: string; 
    onStart: () => void;
}) {
    return (
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="px-8 py-12 text-center border-b border-stone-100">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-700 mb-4">
                    The Patron&apos;s Passage
                </p>
                <h1 className="font-serif text-3xl text-stone-900 mb-4">
                    Before We Begin
                </h1>
                <div className="w-16 h-px bg-stone-300 mx-auto" />
            </div>
            
            {/* Content */}
            <div className="px-8 py-10 space-y-6 text-stone-600 leading-relaxed">
                <p>
                    The <span className="text-stone-900 font-medium">{productName}</span> is 
                    a limited release—only fifty pairs will ever exist. We believe these pieces 
                    should find their way to those who truly understand what they represent.
                </p>
                
                <p>
                    In the next few minutes, we will share a brief conversation. Not a test—a 
                    recognition. We want to know that you know us.
                </p>
                
                <p className="text-stone-500 text-sm italic">
                    Take your time. There is no rush. The boots have waited thirty-five years 
                    to be made; they can wait a few minutes more to find their home.
                </p>
            </div>
            
            {/* Action */}
            <div className="px-8 py-8 bg-stone-50 border-t border-stone-100 text-center">
                <button
                    onClick={onStart}
                    className="px-8 py-3 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors"
                >
                    Begin the Passage
                </button>
                <p className="text-xs text-stone-400 mt-4">
                    5 questions · Approximately 3-5 minutes
                </p>
            </div>
        </div>
    );
}

function QuestionStage({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
    previousAnswer
}: {
    question: CulturalQuestion;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (answer: string) => void;
    previousAnswer?: string;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(previousAnswer || null);
    const [openAnswer, setOpenAnswer] = useState(previousAnswer || '');
    const [showEducation, setShowEducation] = useState(false);
    
    const isOpenEnded = !question.options;
    
    const handleSubmit = () => {
        if (isOpenEnded) {
            onAnswer(openAnswer);
        } else if (selectedOption) {
            onAnswer(selectedOption);
        }
        
        // Reset for next question
        setSelectedOption(null);
        setOpenAnswer('');
        setShowEducation(false);
    };
    
    return (
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {/* Progress */}
            <div className="px-8 py-4 bg-stone-50 border-b border-stone-100">
                <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="uppercase tracking-wider">
                        Question {questionNumber} of {totalQuestions}
                    </span>
                    <span className="uppercase tracking-wider">
                        {question.category.replace('-', ' ')}
                    </span>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-amber-600 transition-all duration-500"
                        style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                    />
                </div>
            </div>
            
            {/* Question */}
            <div className="px-8 py-10">
                <h2 className="font-serif text-xl text-stone-900 leading-relaxed mb-8">
                    {question.prompt}
                </h2>
                
                {/* Multiple Choice */}
                {question.options && (
                    <div className="space-y-3">
                        {question.options.map(option => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedOption(option.id)}
                                className={`w-full text-left px-5 py-4 border transition-all ${
                                    selectedOption === option.id
                                        ? 'border-stone-900 bg-stone-50'
                                        : 'border-stone-200 hover:border-stone-400'
                                }`}
                            >
                                <span className="text-stone-400 mr-3 uppercase text-sm">
                                    {option.id}.
                                </span>
                                <span className="text-stone-700">
                                    {option.text}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
                
                {/* Open Ended */}
                {isOpenEnded && (
                    <div>
                        <textarea
                            value={openAnswer}
                            onChange={(e) => setOpenAnswer(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full h-32 px-4 py-3 border border-stone-200 focus:border-stone-400 focus:outline-none text-stone-700 leading-relaxed resize-none"
                        />
                        <p className="text-xs text-stone-400 mt-2">
                            There is no single correct answer. We are interested in your perspective.
                        </p>
                    </div>
                )}
            </div>
            
            {/* Action */}
            <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
                {question.source && (
                    <p className="text-xs text-stone-400">
                        Source: {question.source}
                    </p>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={!selectedOption && !openAnswer.trim()}
                    className="px-6 py-2 bg-stone-900 text-white text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

function ResultStage({
    result,
    onContinue
}: {
    result: { score: number; tier: AccessTier; feedback: string };
    onContinue: () => void;
}) {
    const tierDisplay: Record<AccessTier, { title: string; description: string; icon: string }> = {
        'patron': {
            title: 'Patron',
            description: 'First access when the drop begins',
            icon: '◆'
        },
        'enthusiast': {
            title: 'Enthusiast',
            description: 'Priority access in the second wave',
            icon: '◇'
        },
        'newcomer': {
            title: 'Newcomer',
            description: 'Access in the third wave',
            icon: '○'
        },
        'waitlist': {
            title: 'Waitlist',
            description: 'We will notify you if pairs become available',
            icon: '·'
        },
        'blocked': {
            title: 'Unable to Verify',
            description: 'Please contact our team',
            icon: '×'
        }
    };
    
    const { title, description, icon } = tierDisplay[result.tier];
    
    return (
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="px-8 py-16 text-center bg-stone-900 text-white">
                <div className="text-4xl mb-4">{icon}</div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-500 mb-3">
                    Your Standing
                </p>
                <h2 className="font-serif text-3xl mb-2">
                    {title}
                </h2>
                <p className="text-stone-400 text-sm">
                    {description}
                </p>
            </div>
            
            {/* Feedback */}
            <div className="px-8 py-10 text-center">
                <p className="text-stone-600 leading-relaxed max-w-md mx-auto">
                    {result.feedback}
                </p>
                
                {result.tier !== 'blocked' && (
                    <div className="mt-8 pt-8 border-t border-stone-100">
                        <p className="text-xs text-stone-400 uppercase tracking-wider mb-4">
                            Cultural Resonance
                        </p>
                        <p className="font-serif text-5xl text-stone-900">
                            {result.score}
                        </p>
                    </div>
                )}
            </div>
            
            {/* Action */}
            <div className="px-8 py-8 bg-stone-50 border-t border-stone-100 text-center">
                {result.tier !== 'blocked' && result.tier !== 'waitlist' ? (
                    <button
                        onClick={onContinue}
                        className="px-8 py-3 bg-amber-700 text-white text-sm uppercase tracking-widest hover:bg-amber-800 transition-colors"
                    >
                        Continue to Drop
                    </button>
                ) : (
                    <button
                        onClick={onContinue}
                        className="px-8 py-3 border border-stone-300 text-stone-600 text-sm uppercase tracking-widest hover:border-stone-400 transition-colors"
                    >
                        Return Home
                    </button>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// UTILITIES
// ============================================================================

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
