import TodoItem, { type TodoType } from '@/components/TodoItem.tsx';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { cn } from 'clsx-for-tailwind';
import {
  Select,
  SelectContent,
  SelectGroup, SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Star } from 'lucide-react';
import * as React from 'react';
import { produce } from 'immer';

const DEFAULT_TASK: TodoType = {
  id: '0',
  content: 'default',
  date: new Date().toLocaleString(),
  editMode: false,
  checkedTodo: false,
};

function TodoMain() {
  const [value, setValue] = React.useState('');
  const [selectFilter, setSelectFilter] = React.useState('All');
  const [listFilter, setListFilter] = React.useState<TodoType[]>([])
  const [placeHolder, setPlaceHolder] = React.useState('Add task');

  const [tasks, setTasks] = React.useState<TodoType[]>(
    () => {
      if (localStorage.getItem('tasks') === null) {
        localStorage.setItem('tasks', JSON.stringify([DEFAULT_TASK]));
        return [DEFAULT_TASK];
      } else {
        const todos: string = localStorage.getItem('tasks') ?? '';
        const initialTasks: TodoType[] = JSON.parse(todos);

        return produce(initialTasks, (draft: TodoType[]) => {
          draft.forEach(task => {
            task.editMode = false;
          });
        });
      }
    },
  );

  const handleSubmit = () => {
    if (value === '') {
      setPlaceHolder('Please enter a task');
      return;
    }

    const todo: TodoType = {
      id: uuidv4(),
      content: value,
      date: new Date().toLocaleString(),
      editMode: false,
      checkedTodo: false,
    };

    const newTasks = produce(tasks, (draft: TodoType[]) => {
      draft.push(todo);
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
    setValue('');
    setPlaceHolder('Add task');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRemoveAll = () => {
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify([DEFAULT_TASK]));
    setTasks([DEFAULT_TASK]);
  };

  function handleRemove(id: string) {
    const newTasks = produce(tasks, (draft: TodoType[]) => {
      const index = draft.findIndex(task => task.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleEdit(id: string, content: string) {
    const newTasks = produce(tasks, (draft: TodoType[]) => {
      const task = draft.find(task => task.id === id);
      if (task) {
        task.content = content;
      }
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  const changeMode = (id: string) => {
    const newTasks = produce(tasks, (draft: TodoType[]) => {
      draft.forEach(task => {
        task.editMode = task.id === id;
      });
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  }
  function handleChecked(id: string) {
    const newTasks = produce(tasks, (draft: TodoType[]) => {
      const task = draft.find(task => task.id === id);
      if (task) {
        task.checkedTodo = !task.checkedTodo;
      }
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  }
  const handleFilter = (value: string) => {
    setSelectFilter(value);
    
    // No need to use immer here as we're not modifying the tasks
    // Just filtering them to create a new derived state
    const filtered = value === 'Processing'
      ? tasks.filter(task => !task.checkedTodo)
      : value === 'Completed'
        ? tasks.filter(task => task.checkedTodo)
        : tasks;
    setListFilter(filtered);
  }
  
  React.useEffect(() => {
    // Apply the current filter when tasks change
    // No need to use immer here as we're just filtering, not modifying
    const filtered = selectFilter === 'Processing'
      ? tasks.filter(task => !task.checkedTodo)
      : selectFilter === 'Completed'
        ? tasks.filter(task => task.checkedTodo)
        : tasks;
    setListFilter(filtered);
  }, [tasks, selectFilter]); // Added selectFilter as a dependency

  return (
    <div className="flex flex-col items-center justify-center min-h-svh w-full">
      {/*header*/}
      <h1 className={'text-6xl my-5 font-[cursive] font-bold text-shadow-md'}>ToDos</h1>
      <div className={'flex gap-2 rounded-md flex-stretch w-2/3 '}>
        {/*submit task*/}
        <Button className={'hover:cursor-pointer border-2'} onClick={handleSubmit}>Add task</Button>
        <Input className={cn(
          'border-4',
          placeHolder !== 'Add task' ? 'placeholder:text-red-300 italic' : 'placeholder:text-gray-400',
        )}
               value={value} type="text"
               placeholder={placeHolder}
               onKeyDown={handleKeyDown}
               onChange={(e) => handleInput(e)} />
        {/*filter*/}
        <Select value={selectFilter} onValueChange={handleFilter}>
          <SelectTrigger className={'border-4'}>
            <SelectValue defaultValue={'All'} placeholder={'All'}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value={'All'}>All</SelectItem>
              <SelectItem value={'Completed'}>Completed</SelectItem>
              <SelectItem value={'Processing'}>Processing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/*display list task*/}
      <div className={'grid grid-cols-1 gap-2 mt-2 bg-gray-300 p-4 rounded-md w-2/3'}>
        {
          listFilter.map((current, index) => {
            const todo: TodoType = {
              id: current.id,
              content: current.content,
              icon: <Star className="w-5 h-5 text-yellow-500" />,
              date: current.date,
              editMode: current.editMode,
              checkedTodo: current.checkedTodo,
            };
            return (<TodoItem
                              todo={todo}
                              // key={index}
                              deleteTodo={handleRemove}
                              editTodo={handleEdit}
                              isEditTodo={todo.editMode}
                              changeMode={changeMode}
                              handleComplete={handleChecked}
              />
            );
          })
        }
      </div>
      <div>
        <Button className={'font-bold my-3'} onClick={handleRemoveAll}>Clear local storage</Button>
      </div>
    </div>
  );
}

export default TodoMain;