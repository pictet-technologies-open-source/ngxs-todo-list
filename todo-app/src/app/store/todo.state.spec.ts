import {NgxsModule, Store} from '@ngxs/store';
import {TestBed} from '@angular/core/testing';
import {TodoState} from './todo.state';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AddTodo, EmptyTodo, LoadAllTodos} from './todo.actions';
import {instance, mock, resetCalls, when} from 'ts-mockito';
import {TodoService} from '../services/todo.service';
import {of} from 'rxjs';

describe('TodoState', () => {
  let store: Store;

  const serviceMock = mock(TodoService);
  const service: TodoService = instance(serviceMock);

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
      providers: [
        {provide: TodoService, useValue: service},
      ]
    });
    store = TestBed.get(Store);
    resetCalls(serviceMock);

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
    describe('loadAllTodos', () => {
      it('should set todos coming from the service into TodoList', () => {

        when(serviceMock.loadAllTodos()).thenReturn(of(['newTodo']));

        store.dispatch(new LoadAllTodos());

        const snapshot = store.selectSnapshot(state => state.todo);
        expect(snapshot.todoList.length).toBe(1);
        expect(snapshot.todoList).toContain('newTodo');
      });
    });

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

