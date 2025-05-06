export class Department {
  id: number;
  name: string;
  users: number[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.users = [];
  }
} 