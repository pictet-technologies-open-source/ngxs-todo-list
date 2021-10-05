import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {instance, mock} from 'ts-mockito';
import {NgxsModule, Store} from '@ngxs/store';
import {HttpClientModule} from '@angular/common/http';
import {TodoState} from '../store/todo.state';
import {FormsModule} from '@angular/forms';

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

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onAddTodo', () => {
        it('should not dispatch AddTodo as newTodo.length === 0', () => {

        });

        it('should dispatch AddTodo once as newTodo.length > 0', () => {

        });
    });
});
