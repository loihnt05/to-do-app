package com.superkid.todos.Service;

import com.superkid.todos.Entity.Todo;
import com.superkid.todos.Repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo postTodo(Todo todo) {
        return todoRepository.save(todo);
    }
}
