import { makeAutoObservable } from 'mobx';
import { todolistId1, todolistId2 } from '../utils/utils';

class Todolists {
  todolists = [
    { id: todolistId1, title: 'Первый', filter: '0' },
    { id: todolistId2, title: 'Второй', filter: '0' },
  ];
  constructor() {
    makeAutoObservable(this);
  }

  addTodolist(todolistId: string, title: string) {
    const newTodolist = {
      id: todolistId,
      filter: '0',
      title,
    };
    this.todolists.push(newTodolist);
  }

  updateTodolist(todolistId: string, title: string) {
    const selectedTodolist = this.todolists.find((tl) => tl.id === todolistId);
    if (selectedTodolist) {
      selectedTodolist.title = title;
    }

    // this.todolists = this.todolists.map((tl) => {
    //   return { ...tl, title: tl.id === todolistId ? title : tl.title };
    // });
  }

  removeTodolist(todolistId: string) {
    this.todolists = this.todolists.filter((item) => item.id !== todolistId);
  }

  changeFilter(todolistId: string, filter: string) {
    const selectedTodolist = this.todolists.find((tl) => tl.id === todolistId);
    if (selectedTodolist) {
      selectedTodolist.filter = filter;
    }
    // this.todolists = this.todolists.map((tl) => {
    //   return { ...tl, filter: tl.id === todolistId ? (tl.filter = filter) : tl.filter };
    // });
  }
  fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=10')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        // Пример: this.todos = [...this.todolists, ...res];
      });
  }
}

export default new Todolists();
