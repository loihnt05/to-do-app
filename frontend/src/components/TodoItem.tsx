import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import * as React from 'react';
import { Check, Pencil, Trash, X } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { useEffect, useRef } from 'react';

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
  const [value, setValue] = React.useState(props.content);
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEdit, setIsEdit] = React.useState(false);

  const handleSaveEdit = () => {
    editTodo(props.id, value);
    setIsEdit(!isEdit);
  };
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);
  return (
    <div className={'flex items-center gap-2 w-full border p-2 bg-white'}>
      {/*check*/}
      <Checkbox id={props.id} onCheckedChange={() => setChecked(!checked)} checked={checked}
                className={'w-6 h-6 bg-gray-200 border hover:cursor-pointer'} />
      <div className={'flex flex-col truncate w-full gap-1'}>
        {/*content*/}
        {
          isEdit ? <Input ref={inputRef} type="text" className={'w-full font-medium font-serif'} value={value}
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
          <div className={'grid grid-cols-2 gap-1'}>
            <Button className={'mb-4 hover:cursor-pointer'} onClick={handleSaveEdit}>
              <Check />
            </Button>
            <Button className={'mb-4 hover:cursor-pointer'} onClick={() => setIsEdit(!isEdit)}>
              <X />
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