export interface Todo {
    _id: string;
    id: string;
    userId: string;
    uniqueId: string;
    completed: boolean;
    taskname: string;
    description: string;
    date: Date;
    priority: number;
    location: string;
}

export interface TodoProps {
  todo: {
    _id: string;
    id: string;
    userId: string;
    uniqueId: string;
    completed: boolean;
    taskname: string;
    description: string;
    date: Date;
    priority: number;
    location: string;
  }
}

export interface Entity {
  date: string;
  description: string;
  location: string;
  priority: number;
  taskname: string;
  uniqueId: string;
  completed: boolean;
  id?: string;
  userId?: string;
  _id?: string;
}