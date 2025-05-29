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
  checkedTodo?: boolean,
  date: string,
  editMode: boolean,
}

type TodoItem = {
  props: TodoType,
  deleteTodo: (id: string) => void,
  isEditTodo: boolean,
  editTodo: (id: string, content: string) => void,
  changeMode: (id: string) => void,
  handleComplete: (id: string) => void,
}

function TodoItem({ props, deleteTodo, editTodo, isEditTodo, changeMode, handleComplete }: TodoItem) {
  const [checked, setChecked] = React.useState(props.checkedTodo ?? false);
  const [value, setValue] = React.useState(props.content);
  const [isEdit, setIsEdit] = React.useState(isEditTodo);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync state with props when they change
  useEffect(() => {
    setChecked(props.checkedTodo ?? false);
    setValue(props.content);
    setIsEdit(isEditTodo);
  }, [props.checkedTodo, props.content, isEditTodo]);

  const handleSaveEdit = () => {
    editTodo(props.id, value);
    setIsEdit(!isEdit);
  };
  const handleEdit = () => {
    changeMode(props.id);
    setIsEdit(!isEdit);
  }
  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const handleChecked = () => {
    setChecked(!checked);
    handleComplete(props.id);
  }

  return (
    <div className={'flex items-center gap-2 w-full border p-2 bg-white'}>
      {/*check*/}
      <Checkbox id={props.id} onCheckedChange={handleChecked} checked={checked}
                className={'w-6 h-6 bg-gray-200 border hover:cursor-pointer'} />
      <div className={'flex flex-col truncate w-full gap-1'}>
        {/*content*/}
        {
          isEdit? <Input ref={inputRef} type="text" className={'w-full font-medium font-serif'} value={value}
                          onChange={(e) => setValue(e.target.value)} /> :
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
        {isEdit?
          <div className={'grid grid-cols-2 gap-1'}>
            <Button className={'mb-4 hover:cursor-pointer'} onClick={handleSaveEdit}>
              <Check />
            </Button>
            <Button className={'mb-4 hover:cursor-pointer'} onClick={() => setIsEdit(!isEdit)}>
              <X />
            </Button>
          </div> :
          <div className={'grid grid-cols-2 gap-1'}>
            <Button className={'hover:cursor-pointer'} onClick={handleEdit}>
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