package com.superkid.todos.Controller;

import com.superkid.todos.Entity.Todo;
import com.superkid.todos.Service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Cho phép frontend truy cập
public class TodoController {
    private final TodoService todoService;

    @PostMapping("/todo")
    public Todo postTodo(@RequestBody Todo todo) {
        return todoService.postTodo(todo);
    }
}
