export class User {
  id: number;
  name: string;
  departmentId: number;

  constructor(id: number, name: string, departmentId: number) {
    this.id = id;
    this.name = name;
    this.departmentId = departmentId;
  }
} 