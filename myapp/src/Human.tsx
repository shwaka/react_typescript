import React from 'react';
import { IToKey } from "./MyTable";
import { Column } from "./Column";

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

export class NameColumn implements Column<Human> {
  header = "名前";
  key = "NAME";
  toElement(data: Human): JSX.Element {
    return <span>{data.name}</span>;
  }
}

export class AgeColumn implements Column<Human> {
  header = "年齢";
  key = "AGE";
  toElement(data: Human): JSX.Element {
    return <span>{data.age}</span>;
  }
}
