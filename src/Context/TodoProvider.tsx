/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState } from 'react';
// types.ts
 interface TodoItem {
    id: number
    Category: string,
    Completed: boolean,
    Description: string,
    Title: string,
  }
   interface TodoContextType {
    TodoList: TodoItem[];
    setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  }
export const TodoContinent = createContext<TodoContextType | undefined>(undefined);
const TodoContext = ({children}:any)=>{
    const [TodoList,setTodoList] = useState<TodoItem[]>([]);
    return(
        <TodoContinent.Provider value={{TodoList,setTodoList}}>
            {children}
        </TodoContinent.Provider>
    );
};
export default TodoContext;
