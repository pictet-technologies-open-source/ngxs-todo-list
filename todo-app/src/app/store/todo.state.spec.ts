import {NgxsModule, Store} from '@ngxs/store';
import {TestBed} from '@angular/core/testing';
import {TodoState} from './todo.state';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AddTodo, EmptyTodo} from './todo.actions';

describe('TodoState', () => {
  let store: Store;


  // TEST DATA

  const STATE_INIT = {
    todo: {
      todoList: ['todo1'],
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([TodoState]),
        HttpClientTestingModule,
      ],
    });
    store = TestBed.get(Store);

    store.reset(STATE_INIT);
  });

  it('should create the store', () => {
    expect(store).toBeTruthy();
  });

  describe('SELECTORS', () => {
    describe('getTodoList', () => {
      it('should return todoList from the state', () => {
        const result = store.selectSnapshot(TodoState.getTodoList);

        expect(result.length).toBe(1);
        expect(result[0]).toEqual('todo1');
      });
    });
  });

  describe('ACTIONS', () => {
    describe('addTodo', () => {
      it('should add a todo to TodoList from the state', () => {
        store.dispatch(new AddTodo('todo2'));

        const snapshot = store.selectSnapshot(state => state.todo);
        expect(snapshot.todoList.length).toBe(2);
        expect(snapshot.todoList).toContain('todo1');
        expect(snapshot.todoList).toContain('todo2');
      });
    });

    describe('emptyTodo', () => {
      it('should empty TodoList', () => {
        store.dispatch(new EmptyTodo());

        const snapshot = store.selectSnapshot(state => state.todo);
        expect(snapshot.todoList.length).toBe(0);
      });
    });
  });

});

