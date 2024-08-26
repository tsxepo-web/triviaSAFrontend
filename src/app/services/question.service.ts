import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionsUrl =
    'https://triviasabackend.azurewebsites.net/api/Question';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl);
  }
  getRandomQuestion(): Observable<Question> {
    const url = `${this.questionsUrl}/random`;
    return this.http.get<Question>(url).pipe(
      map((question) => {
        return question;
      })
    );
  }
  addQuestion(question: Question): Observable<Question> {
    return this.http
      .post<Question>(this.questionsUrl, question, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError('addQuestion', error)
        )
      );
  }
  deleteQuestion(id: string): Observable<Question> {
    const url = `${this.questionsUrl}/${id}`;
    return this.http.delete<Question>(url, this.httpOptions);
  }
  updateQuestion(question: Question): Observable<any> {
    const url = `${this.questionsUrl}/${question.id}`;
    return this.http.put(url, question, this.httpOptions);
  }

  private handleError(operation: string, error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
