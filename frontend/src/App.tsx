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

function App() {
    const taskTodo: TodoType[] = [
        {
            id: "0",
            content: 'default',
        },
        {
            id: "1",
            content: 'default 1',
        },{
            id: "2",
            content: 'default 2',
        },{
            id: "3",
            content: 'default 3',
        },{
            id: "4",
            content: 'default 4',
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
        console.log(e.target.value);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            {/*header*/}
            <h1 className={'text-6xl my-5'}>ToDos</h1>
            <div className={'flex gap-2 px-4 rounded-md flex-stretch'}>
                {/*submit task*/}
                <Button className={'hover:cursor-pointer'} onClick={handleSubmit}>Add task</Button>
                <Input value={value} type='text' placeholder="Aa" onChange={(e) => handleInput(e)}/>
                {/*filter*/}
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={"All"}></SelectValue>
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
            <div className={'grid grid-cols-1 gap-2 mt-4 bg-gray-300 p-4 rounded-md '}>
                {
                    tasks.map((current, index) => {
                        const todo: TodoType = {
                            id: current.id,
                            content: current.content,
                        }
                        return (<TodoItem id={index} props={todo}/>)
                    })
                }
            </div>
        </div>
    )
}

export default App
