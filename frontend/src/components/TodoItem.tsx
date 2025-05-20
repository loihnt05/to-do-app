import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import * as React from 'react';
import { Pencil, Trash } from 'lucide-react';

const DEFAULT_TASK = {
  id: 1,
  content: 'Hello my name is ho nguyen tai loi',
  checked: false,
  date: new Date()
}

function TodoItem() {
  const [checked, setChecked] = React.useState(false);
  const [date] = React.useState(new Date());
  const handleCheck = () => {
    setChecked(!checked);
  }
  return (
    <div className={'flex items-center gap-2 w-full border p-2 bg-white'}>
      {/*check*/}
      <Checkbox id={'temp'} onCheckedChange={handleCheck} className={'w-6 h-6 bg-gray-200 border'} />
      <div className={'flex flex-col'}>
        {/*content*/}
        <Label htmlFor={'temp'}
               className={'font-medium font-serif'
                 + `${(checked) ? ' line-through decoration-1 opacity-50 decoration-gray-500 font-light italic' : ''}`}>
          {DEFAULT_TASK.content}
        </Label>
        <p className={'font-sans text-xs font-light italic'}>{date.toLocaleString()}</p>
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