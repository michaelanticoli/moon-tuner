import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { quizQuestions } from "./schoolData";

export function SchoolAssessment() {
  const [currentQuestions, setCurrentQuestions] = useState(() => 
    shuffleArray(quizQuestions).slice(0, 5)
  );
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleNewAssessment = () => {
    setCurrentQuestions(shuffleArray(quizQuestions).slice(0, 5));
    setAnswers({});
    setShowResults(false);
  };

  const score = showResults 
    ? currentQuestions.reduce((acc, q, i) => 
        acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
          Knowledge Assessment
        </h2>
        <p className="text-muted-foreground">
          Validate your understanding through systematic testing. Identify areas requiring additional study.
        </p>
      </div>

      {showResults && (
        <div className="bg-card border border-border p-8 text-center">
          <h3 className="font-serif text-2xl text-foreground mb-2">
            Your Score: {score} / {currentQuestions.length}
          </h3>
          <p className="text-muted-foreground">
            {score === currentQuestions.length 
              ? "Perfect! You've mastered this material."
              : score >= currentQuestions.length * 0.8
              ? "Excellent understanding. Review any missed questions."
              : "Keep studying. Review the foundations and try again."}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {currentQuestions.map((question, qIndex) => (
          <div 
            key={qIndex}
            className="bg-card border border-border p-8"
          >
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Question {qIndex + 1}
            </h4>
            <p className="text-lg text-foreground mb-6">
              {question.question}
            </p>
            <div className="space-y-3">
              {question.options.map((option, oIndex) => {
                const isSelected = answers[qIndex] === oIndex;
                const isCorrect = oIndex === question.correctIndex;
                const showCorrectness = showResults;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    disabled={showResults}
                    className={`w-full text-left p-4 border transition-colors flex items-center justify-between ${
                      showCorrectness
                        ? isCorrect
                          ? 'bg-foreground text-background border-foreground'
                          : isSelected
                          ? 'bg-muted text-muted-foreground border-muted'
                          : 'bg-card border-border'
                        : isSelected
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-muted/50 border-border hover:border-foreground/50'
                    }`}
                  >
                    <span>{option}</span>
                    {showCorrectness && isCorrect && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {!showResults ? (
          <Button 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < currentQuestions.length}
            size="lg"
          >
            Submit Assessment
          </Button>
        ) : (
          <Button onClick={handleNewAssessment} size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New Assessment
          </Button>
        )}
      </div>
    </div>
  );
}
