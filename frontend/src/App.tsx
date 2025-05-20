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
import TodoItem from '@/components/TodoItem.tsx';
function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            {/*header*/}
            <h1 className={'text-6xl mb-5'}>ToDos</h1>
            <div className={'flex gap-2 px-4 rounded-md flex-stretch'}>
                {/*submit task*/}
                <Button className={'hover:cursor-pointer'}>Add task</Button>
                <Input type='text' placeholder="Aa" />
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
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
            </div>
        </div>
    )
}

export default App
