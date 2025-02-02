import { Observable } from '@nativescript/core';
import { words } from './models/word.model';

export class QuizViewModel extends Observable {
    private currentWord: typeof words[0];
    private _options: string[] = [];
    private _feedback: string = '';
    private _isCorrect: boolean = false;
    private questionCount: number = 1;
    private correctAnswers: number = 0;
    private _isQuizCompleted: boolean = false;
    private usedWords: Set<number> = new Set();
    private _finalScore: string = '';

    constructor() {
        super();
        this.generateQuestion();
    }

    get question(): string {
        return `What is the translation of "${this.currentWord.original}"?`;
    }

    get options(): string[] {
        return this._options;
    }

    get feedback(): string {
        return this._feedback;
    }

    get isCorrect(): boolean {
        return this._isCorrect;
    }

    get progress(): string {
        return `Question ${this.questionCount} of ${words.length}`;
    }

    get showNextButton(): boolean {
        return this._feedback !== '' && !this._isQuizCompleted;
    }

    get isQuizCompleted(): boolean {
        return this._isQuizCompleted;
    }

    get finalScore(): string {
        return this._finalScore;
    }

    onOptionTap(args: any) {
        if (this._feedback !== '') return;

        const selectedIndex = parseInt(args.object.id);
        const selectedAnswer = this._options[selectedIndex];
        
        this._isCorrect = selectedAnswer === this.currentWord.translation;
        if (this._isCorrect) {
            this.correctAnswers++;
        }
        
        this._feedback = this._isCorrect ? 'Correct!' : 'Incorrect. The right answer is: ' + this.currentWord.translation;
        
        this.notifyPropertyChange('feedback', this._feedback);
        this.notifyPropertyChange('isCorrect', this._isCorrect);
        this.notifyPropertyChange('showNextButton', this.showNextButton);
    }

    onNextTap() {
        this._feedback = '';
        
        if (this.questionCount >= words.length) {
            this._isQuizCompleted = true;
            const percentage = Math.round((this.correctAnswers / words.length) * 100);
            this._finalScore = `Final Score: ${this.correctAnswers}/${words.length} (${percentage}%)`;
            
            this.notifyPropertyChange('isQuizCompleted', true);
            this.notifyPropertyChange('finalScore', this._finalScore);
        } else {
            this.questionCount++;
            this.generateQuestion();
        }
        
        this.notifyPropertyChange('feedback', this._feedback);
        this.notifyPropertyChange('showNextButton', this.showNextButton);
        this.notifyPropertyChange('progress', this.progress);
    }

    private generateQuestion() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * words.length);
        } while (this.usedWords.has(randomIndex));
        
        this.usedWords.add(randomIndex);
        this.currentWord = words[randomIndex];

        const incorrectOptions = words
            .filter(w => w !== this.currentWord)
            .map(w => w.translation)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        this._options = [...incorrectOptions, this.currentWord.translation]
            .sort(() => Math.random() - 0.5);

        this.notifyPropertyChange('question', this.question);
        this.notifyPropertyChange('options', this._options);
        this.notifyPropertyChange('progress', this.progress);
    }
}