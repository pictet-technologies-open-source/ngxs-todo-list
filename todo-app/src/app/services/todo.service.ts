import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  loadAllTodos(): Observable<string[]> {
    // mock of data coming from the backend
    return of(['todo1', 'todo2']);
  }
}
