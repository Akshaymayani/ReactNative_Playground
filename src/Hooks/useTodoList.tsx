import { TodoContinent } from '../Context/TodoProvider';
import { useContext } from 'react';

export interface TodoData {
  id: number
  Category: string,
  Completed: boolean,
  Description: string,
  Title: string,
}
interface TodoContextType {
    TodoList: TodoData[];
    setTodoList: React.Dispatch<React.SetStateAction<TodoData[]>>;
  }
const useTodoList = () => {
  const context:any = useContext<TodoContextType | undefined>(TodoContinent);
  if(!context) {
    throw new Error('context must be use inside provider');
    }
  return context;
};

export default useTodoList;
