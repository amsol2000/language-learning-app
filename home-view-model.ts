import { Frame } from '@nativescript/core';
import { Observable } from '@nativescript/core';

export class HomeViewModel extends Observable {
    constructor() {
        super();
    }

    onLearnTap() {
        Frame.topmost().navigate('learn-page');
    }

    onQuizTap() {
        Frame.topmost().navigate('quiz-page');
    }
}