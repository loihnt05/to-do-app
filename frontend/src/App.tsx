import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import TodoItem, { type TodoType } from '@/components/TodoItem.tsx';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Star } from 'lucide-react';

function App() {
    const taskTodo: TodoType[] = [
        {
            id: "0",
            content: 'default',
        },
    ];
    const [value, setValue] = React.useState('');
    const [tasks, setListTask] = React.useState<TodoType[]>(taskTodo);
    const handleSubmit = () => {
        // console.log(value);
        const todo: TodoType = {
            id: uuidv4(),
            content: value,
        }
        setListTask((prevTask) => [...prevTask, todo]);
        setValue('');
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        // console.log(e.target.value);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-svh w-full">
            {/*header*/}
            <h1 className={'text-6xl my-5 font-[cursive] font-bold text-shadow-md'}>ToDos</h1>
            <div className={'flex gap-2 rounded-md flex-stretch w-2/3 '}>
                {/*submit task*/}
                <Button className={'hover:cursor-pointer border-2'} onClick={handleSubmit}>Add task</Button>
                <Input className={'border-4'} value={value} type='text' placeholder="Add task" onChange={(e) => handleInput(e)}/>
                {/*filter*/}
                <Select >
                    <SelectTrigger className={'border-4'}>
                        <SelectValue placeholder={"Filter"}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Group 1</SelectLabel>
                            <SelectItem value={"A"}>A</SelectItem>
                            <SelectItem value={"B"}>B</SelectItem>
                            <SelectItem value={"C"}>C</SelectItem>
                            <SelectItem value={"D"}>D</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/*display list task*/}
            <div className={'grid grid-cols-1 gap-2 mt-2 bg-gray-300 p-4 rounded-md w-2/3'}>
                {
                    tasks.map((current, index) => {
                        const todo: TodoType = {
                            id: current.id,
                            content: current.content,
                            icon: <Star className="w-5 h-5 text-yellow-500" />
                        }
                        // console.log(current.id, " ", current.content);
                        return (<TodoItem key={index} props={todo}/>)
                    })
                }
            </div>
        </div>
    )
}

export default App
