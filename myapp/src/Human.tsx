import { IToKey } from "./MyTable";

export class Human implements IToKey {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  toKey(): string {
    return `${this.name}(${this.age})`;
  }
}
