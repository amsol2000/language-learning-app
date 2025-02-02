import { Observable } from '@nativescript/core';
import { words } from './models/word.model';

export class LearnViewModel extends Observable {
    private currentIndex: number = 0;
    private _isCompleted: boolean = false;

    constructor() {
        super();
        this.updateCurrentWord();
    }

    onNextTap() {
        if (this._isCompleted) {
            return;
        }
        
        this.currentIndex++;
        if (this.currentIndex >= words.length) {
            this._isCompleted = true;
            this.notifyPropertyChange('isCompleted', true);
            this.notifyPropertyChange('buttonText', this.buttonText);
        }
        this.updateCurrentWord();
    }

    private updateCurrentWord() {
        this.notifyPropertyChange('currentWord', words[this.currentIndex]);
        this.notifyPropertyChange('progress', this.progress);
    }

    get currentWord() {
        return words[this.currentIndex];
    }

    get progress(): string {
        return `Word ${this.currentIndex + 1} of ${words.length}`;
    }

    get buttonText(): string {
        return this._isCompleted ? "Completed!" : "Next Word";
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    get completionMessage(): string {
        return "Congratulations! You've learned all the words. Feel free to take the quiz to test your knowledge!";
    }
}