import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AddTodo, EmptyTodo, LoadAllTodos} from '../store/todo.actions';
import {TodoState} from '../store/todo.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(TodoState.getTodoList) todoList$?: Observable<string[]>;

  newTodo = '';

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadAllTodos());
  }

  onAddTodo(): void {
    if (this.newTodo.length > 0) {
      this.store.dispatch(new AddTodo(this.newTodo));
    }
    this.newTodo = '';
  }

  onEmptyList(): void {
    this.store.dispatch(new EmptyTodo());
  }
}
