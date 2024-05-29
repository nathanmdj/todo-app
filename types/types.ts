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

export interface Entity {
  date: Date | string;
  description: string;
  location: string;
  priority: number;
  taskname: string;
  uniqueId: string;
  id?: string;
  userId?: string;
  _id?: string;
}