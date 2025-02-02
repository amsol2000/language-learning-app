import { NavigatedData, Page } from '@nativescript/core';
import { QuizViewModel } from './quiz-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new QuizViewModel();
}