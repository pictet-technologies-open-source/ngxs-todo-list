import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {anyOfClass, capture, instance, mock, resetCalls, verify, when} from 'ts-mockito';
import {NgxsModule, Store} from '@ngxs/store';
import {HttpClientModule} from '@angular/common/http';
import {TodoState} from '../store/todo.state';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {AddTodo, EmptyTodo} from '../store/todo.actions';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const storeMock = mock(Store);
  const store: Store = instance(storeMock);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        NgxsModule.forRoot([TodoState], {
          developmentMode: true
        }),
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {provide: Store, useValue: store},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    when(storeMock.select(TodoState.getTodoList)).thenReturn(of(['TODO_1']));

    resetCalls(storeMock);

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddTodo', () => {
    it('should not dispatch AddTodo as newTodo.length === 0', () => {
      component.onAddTodo();

      verify(storeMock.dispatch(anyOfClass(AddTodo))).never();
    });

    it('should dispatch AddTodo once as newTodo.length > 0', () => {
      component.newTodo = 'newTodo';

      component.onAddTodo();

      verify(storeMock.dispatch(anyOfClass(AddTodo))).once();

      const arg: AddTodo[] = capture(storeMock.dispatch).first();
      expect(arg.length).toEqual(1);
      expect(arg[0].newTodo).toEqual('newTodo');
    });
  });

  describe('onEmptyList', () => {
    it('should dispatch EmptyTodo once', () => {
      component.onEmptyList();

      verify(storeMock.dispatch(anyOfClass(EmptyTodo))).once();
    });
  });
});
