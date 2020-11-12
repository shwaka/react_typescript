export type Human = {
  name: string;
  age: number;
}

export type FilterFunc = (human: Human) => boolean;
