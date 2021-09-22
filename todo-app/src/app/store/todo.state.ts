import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddTodo, EmptyTodo, LoadAllTodos} from './todo.actions';
import {TodoService} from '../services/todo.service';
import {Injectable} from '@angular/core';

export interface TodoStateModel {
  todoList: string[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todoList: [],
  }
})
@Injectable()
export class TodoState {

  constructor(private readonly todoService: TodoService) {
  }

  @Selector()
  static getTodoList(state: TodoStateModel): string[] {
    return state.todoList;
  }

  @Action(LoadAllTodos)
  loadAllTodos({patchState}: StateContext<TodoStateModel>): void {
    this.todoService.loadAllTodos().subscribe((todos: string []) => {
      patchState({todoList: todos});
    });
  }

  @Action(AddTodo)
  addTodo({patchState, getState}: StateContext<TodoStateModel>, {newTodo}: AddTodo): void {
    patchState({todoList: [...getState().todoList, newTodo]});
  }

  @Action(EmptyTodo)
  emptyTodo({patchState}: StateContext<TodoStateModel>): void {
    patchState({todoList: []});
  }
}
