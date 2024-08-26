import { Component } from '@angular/core';
import { Question } from '../../interfaces/question';
import { QuestionService } from '../../services/question.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-management',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './question-management.component.html',
  styleUrl: './question-management.component.css',
})
export class QuestionManagementComponent {
  questions: Question[] = [];
  newQuestion: Question = {
    id: '',
    question: '',
    options: [],
    correctAnswer: '',
    distractors: [],
  };
  optionsAsString: string = '';
  distractorsAsString: string = '';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {}

  add(): void {
    this.newQuestion.options = this.optionsAsString
      .split(',')
      .map((option) => option.trim());
    this.newQuestion.distractors = this.distractorsAsString
      .split(',')
      .map((distractor) => distractor.trim());

    this.questionService.addQuestion(this.newQuestion).subscribe({
      next: (question) => {
        this.questions.push(question);
        this.resetForm();
      },
      error: (error) => {
        console.error('Failed to add question:', error);
      },
    });
  }

  resetForm(): void {
    this.newQuestion = {
      id: '',
      question: '',
      options: [],
      correctAnswer: '',
      distractors: [],
    };
    this.optionsAsString = '';
    this.distractorsAsString = '';
  }

  onQuestionSelected(question: Question): void {
    this.newQuestion = question;
    this.optionsAsString = this.newQuestion.options.join(', ');
    this.distractorsAsString = this.newQuestion.distractors.join(', ');
  }
}
