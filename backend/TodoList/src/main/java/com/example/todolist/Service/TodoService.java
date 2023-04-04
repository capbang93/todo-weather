package com.example.todolist.Service;


import com.example.todolist.Entity.TodoEntity;
import com.example.todolist.Repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    // Todo 엔티티를 받아서 검증 후 생성
    public Optional<TodoEntity> create(final TodoEntity entity) {
        //Validations
        validate(entity);
        repository.save(entity);
        // ID에 해다하는 엔티티를 넘겨줌.
        return repository.findById(entity.getId());
    }

    public List<TodoEntity> retrieve(final String userId){
        return repository.findByUserId(userId);
    }


    // 유저 아이디가 다르면,,
    public void validate(final TodoEntity entity){
        if(entity == null){
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if(entity.getUserId() == null){
            log.warn("Unknown user!");
            throw new RuntimeException("Unknown user!");
        }
    }


}
