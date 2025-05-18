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

function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            {/*header*/}
            <h1>ToDos</h1>
            {/*submit task*/}
            <Button>Add task</Button>
            <Input type="email" placeholder="Email" />
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

            {/*display list task*/}

        </div>
    )
}

export default App
