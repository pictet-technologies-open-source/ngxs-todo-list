import {Component} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todoList$ = of([]);

  newTodo = '';

  constructor() {}

  onAddTodo(): void {
  }

  onEmptyList(): void {
  }
}
