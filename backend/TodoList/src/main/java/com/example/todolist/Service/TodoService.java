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
    public List<TodoEntity> create(final TodoEntity entity) {
        //Validations
        validate(entity);
        repository.save(entity);
        // ID에 해다하는 엔티티를 넘겨줌.
        //return repository.findById(entity.getId());
        return repository.findByUserId(entity.getUserId());
    }

    public List<TodoEntity> retrieve(final String userId){
        return repository.findByUserId(userId);
    }

    public List<TodoEntity>update(final TodoEntity entity){
        //Validations
        validate(entity);
        if(repository.existsById(entity.getId()))
        {
            repository.save(entity);
        }
        else
        {
            throw new RuntimeException("Unknown id");
        }
        return repository.findByUserId(entity.getUserId());
    }


    /** 이 부분은 사용안함
    public Optional<TodoEntity> updateTodo(final TodoEntity entity){
        //Validations
        validate(entity);

        //  테이블에서 id에 해당하는 데이터셋을 가져옴
        final Optional<TodoEntity> original = repository.findById(entity.getId());

        // original에 담겨진 내용을 todo 에할당하고 title, done 값을 변경한다.
        original.ifPresent(todo ->{
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());
            repository.save(todo);
        });

        return repository.findById(entity.getId());
    }
     */

    public List<TodoEntity> delete(final TodoEntity entity){
        if(repository.existsById(entity.getId())){
            repository.deleteById(entity.getId());
        }
        else{
            throw new RuntimeException("id dose Not exist!!");
        }
        return repository.findByUserId(entity.getUserId());
    }


    /**-----------------validation------------------*/
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
