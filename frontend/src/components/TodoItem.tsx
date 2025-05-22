import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import * as React from 'react';
import { Pencil, Trash } from 'lucide-react';

export type TodoType = {
  id: string,
  content: string,
  icon?: React.ReactNode,
  checked?: boolean,
  date: string,
}

function TodoItem({ props } : { props: TodoType }) {
  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  }
  return (
    <div className={'flex items-center gap-2 w-full border p-2 bg-white'}  >
      {/*check*/}
      <Checkbox id={props.id} onCheckedChange={handleCheck} className={'w-6 h-6 bg-gray-200 border hover:cursor-pointer'} />
      <div className={'flex flex-col truncate w-full'}>
        {/*content*/}
        <Label htmlFor={props.id}
               className={'font-medium font-serif hover:cursor-pointer'
                 + `${(checked) ? ' line-through decoration-1 opacity-50 decoration-gray-500 font-light italic' : ''}`}>
          {props.content}
          {props.icon}
        </Label>
        <p className={'font-sans text-xs font-light italic'}>{props.date.toLocaleString()}</p>
      </div>
      {/*edit and remove*/}
      <div className={'grid grid-cols-2 ml-auto gap-1'}>
        <Button className={'hover:cursor-pointer'}>
          <Pencil></Pencil>
        </Button>
        <Button className={'hover:cursor-pointer'}>
          <Trash></Trash>
        </Button>
      </div>
    </div>
  );
}

export default TodoItem;