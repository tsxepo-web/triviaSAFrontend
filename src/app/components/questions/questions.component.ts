import { Component } from '@angular/core';
import { Question } from '../../interfaces/question';
import { QuestionService } from '../../services/question.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent {
  randomQuestion: Question | undefined;
  selectedOption: string | undefined;
  showResult: boolean = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestion();
  }
  getQuestion(): void {
    this.questionService.getRandomQuestion().subscribe((question) => {
      if (question) {
        this.randomQuestion = question;
        this.selectedOption = undefined;
        this.showResult = false;
      } else {
        throw new Error('No question found.');
      }
    });
  }
  onOptionSelected(option: string): void {
    this.selectedOption = option;
  }
  checkAnswer(): void {
    this.showResult = true;
  }
  nextQuestion(): void {
    this.getQuestion();
  }
}
