import { TodoStatus } from "./utils";

export interface Todo {
  id: number;
  status: keyof typeof TodoStatus;
  title: string;
  desc: string;
}
