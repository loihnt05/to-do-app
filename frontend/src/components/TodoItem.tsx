import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import * as React from 'react';

function TodoItem() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className={'flex items-center gap-2 w-full border p-3'}>
      {/*check*/}
      <Checkbox id={'temp'} onCheckedChange={() => setChecked(!checked)} />
      {/*content*/}
      <Label htmlFor={'temp'}
             className={'text-sm font-medium leading-none ' +
               'peer-d' +
               'isabled:cursor-not-allowed peer-disabled:opacity-70'
               + `${(checked) ? ' line-through' : ''}`}>

      </Label>

      {/*edit and remove*/}
      <div className={'grid grid-cols-2 ml-auto gap-1'}>
        <Button className={''}>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}

export default TodoItem;