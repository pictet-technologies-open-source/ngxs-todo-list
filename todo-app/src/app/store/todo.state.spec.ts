import {TestBed} from '@angular/core/testing';
import {TodoState} from './todo.state';
import {NgxsModule, Store} from '@ngxs/store';
import {TodoService} from '../services/todo.service';
import {instance, mock, resetCalls} from 'ts-mockito';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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

            });
        });
    });

    describe('ACTIONS', () => {
        describe('addTodo', () => {
            it('should add a todo to TodoList from the state', () => {

            });
        });
    });
});
