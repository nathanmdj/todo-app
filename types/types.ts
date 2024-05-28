export interface Todo {
  _id: string;
  taskname: string;
  description: string;
  date: Date;
  priority: number;
  location: string;
}

export interface TodoProps {
  todo: {
    _id: string;
    taskname: string;
    description: string;
    date: Date;
    priority: number;
    location: string;
  }
}