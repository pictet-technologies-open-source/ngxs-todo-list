import {Injectable} from '@angular/core';
import {TodoService} from '../services/todo.service';


@Injectable()
export class TodoState {

    constructor(private readonly todoService: TodoService) {
    }

}
