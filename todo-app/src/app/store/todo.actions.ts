export class LoadAllTodos {
  static readonly type = '[Todo] Load All';
}

export class AddTodo {
  static readonly type = '[Todo] Add';

  constructor(public newTodo: string) {
  }
}

export class EmptyTodo {
  static readonly type = '[Todo] Empty';
}
