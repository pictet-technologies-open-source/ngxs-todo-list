import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs';
import {Store} from '@ngxs/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    todoList$ = of([]);

    newTodo = '';

    constructor(private readonly store: Store) {
    }

    ngOnInit(): void {
    }

    onAddTodo(): void {
    }

    onEmptyList(): void {
    }
}
