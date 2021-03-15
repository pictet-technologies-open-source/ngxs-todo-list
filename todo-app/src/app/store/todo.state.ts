import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddTodo, EmptyTodo} from './todo.actions';

export interface TodoStateModel {
  todoList: string[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todoList: [],
  }
})
export class TodoState {

  @Selector()
  static getTodoList(state: TodoStateModel): string[] {
    return state.todoList;
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
