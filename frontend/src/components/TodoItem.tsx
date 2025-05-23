import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import * as React from 'react';
import { Check, Pencil, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';

export type TodoType = {
  id: string,
  content: string,
  icon?: React.ReactNode,
  checked?: boolean,
  date: string,
}

type TodoItem = {
  props: TodoType,
  deleteTodo: (id: string) => void,
  // isEdit: boolean,
  editTodo: (id: string, content: string) => void,
}

function TodoItem({ props, deleteTodo, editTodo }: TodoItem) {
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState('');

  const [isEdit, setIsEdit] = React.useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };
  const handleSaveEdit = () => {
    editTodo(props.id, value);
    setIsEdit(!isEdit);
  };
  return (
    <div className={'flex items-center gap-2 w-full border p-2 bg-white'}>
      {/*check*/}
      <Checkbox id={props.id} onCheckedChange={handleCheck}
                className={'w-6 h-6 bg-gray-200 border hover:cursor-pointer'} />
      <div className={'flex flex-col truncate w-full gap-1'}>
        {/*content*/}
        {
          isEdit ? <Input type="text" className={'w-full font-medium font-serif'} value={value}
            onChange={(e) => setValue(e.target.value)}/> :
            <Label htmlFor={props.id}
                   className={'font-medium font-serif hover:cursor-pointer'
                     + `${(checked) ? ' line-through decoration-1 opacity-50 decoration-gray-500 font-light italic' : ''}`}>
              {props.content}
              {props.icon}
            </Label>
        }
        <p className={'font-sans text-xs font-light italic'}>{props.date.toLocaleString()}</p>
      </div>
      {/*edit and remove*/}
      <div className={'ml-auto gap-1'}>
        {isEdit ?
          <div className={''}>
            <Button className={'grid-cols-1 mb-4 hover:cursor-pointer'} onClick={handleSaveEdit}>
              <Check />
            </Button>
          </div> :
          <div className={'grid grid-cols-2 gap-1'}>
            <Button className={'hover:cursor-pointer'} onClick={() => setIsEdit(!isEdit)}>
              <Pencil></Pencil>
            </Button>
            <Button className={'hover:cursor-pointer'} onClick={() => deleteTodo(props.id)}>
              <Trash></Trash>
            </Button>
          </div>
        }
      </div>
    </div>
  );
}

export default TodoItem;