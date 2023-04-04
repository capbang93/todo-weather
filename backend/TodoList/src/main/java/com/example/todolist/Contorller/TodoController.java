package com.example.todolist.Contorller;


import com.example.todolist.DTO.ResponseDTO;
import com.example.todolist.DTO.TodoDTO;
import com.example.todolist.Entity.TodoEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.todolist.Service.TodoService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService service;


    // 새로운 Todo를 생성하는 부분. 응답 객체로 TodoDTO를 받아온다.
    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody TodoDTO dto){
        try{
            /*post localhost:8080/todo{ "title" : "My first Todo", "done" : false}*/
             log.info("Log:create Todo entrance");

             // dto를 이용해 테이블에 저장하기 위한 entity를 생성한다.
            TodoEntity entity = TodoDTO.toEntity(dto);
            log.info("Log:dto => entity ok!");

            // entity userId를 임시로 지정한다.
            entity.setUserId("temporary-userId");

            // service.create 를 통해 repository에 entity를 저장한다.
            // service.create를 통해서 반환되는 값은, 해당 id와 일치하는 entitiy가 반환된다.
            // 이 때 넘어오는 값이 없을 수도 있으므로 List가 아니라 Optional를 사용한다.
            Optional<TodoEntity> entities = service.create(entity);
            log.info("Log:service.create OK!");

            // entities를 DTOs로 스트림 변환한다.
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());
            log.info("Log:entities => dtos ok!");

            //Response DTO를 생성한다.
            /**
             * {
             *     "error : null,
             *     "data": [id, title, done]
             * }
            */
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
            log.info("Log:responsedto ok!");

            //HTTP Status 200 상태로 response를 전송한다.
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    // 유저 id에 저장된 todoEntity를 조회.
    @GetMapping
    public ResponseEntity<?>retrieveTodoList(){
        String temporaryUserId = "temporary-userId";
        List<TodoEntity> entities = service.retrieve(temporaryUserId);
        List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());

        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();
        // HTTP Status 200 상태로 response를 전송한다.
        return ResponseEntity.ok().body(response);
    }

    //
    @GetMapping("/update")
    public ResponseEntity<?>update(@RequestBody TodoDTO dto){
        try{
            //dto를 이용해 테이블에 저장하기 위한 entity를 생성한다.
            TodoEntity entity = TodoDTO.toEntity(dto);

            //entity userId를 임시로 저장한다.
            entity.setUserId("temporary-userId");

            //service.create를 통해 repository에 entity를 저장한다.
            Optional<TodoEntity> entities = service.update(entity);

            //entities를 dtos로 스트림 변환한다.
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());

            //Response DTO를 생성한다.
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();

            //HTTP Status 200 상테로 response를 전송한다.
            return ResponseEntity.ok().body(response);
        }
        catch (Exception e){
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping
    public ResponseEntity<?>updateTodo(@RequestBody TodoDTO dto) {
        try {
            //dto를 이용해 테이블에 저장하기 위한 enitiy를 생성한다.
            TodoEntity entity = TodoDTO.toEntity(dto);
            // entitiy userId를 임시로 지정한다.
            entity.setUserId("temporary-userId");

            //service.create를 통해 repository에 entity를 저장한다.
            Optional<TodoEntity> entities = service.updateTodo(entity);

            // entities를 dtos로 스트림 변환한다.
            List<TodoDTO> dtos = entities.stream().map(TodoDTO::new).collect(Collectors.toList());

            // Response DTO를 생성한다.
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().data(dtos).build();

            // HTTP 200 상태로 RESPONSE를 전송한다.
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);

        }

    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestBody TodoDTO dto){
        try {
            List<String> message = new ArrayList<>();
            String msg = service.delete(dto.getId());
            message.add(msg);
            // ResponseDTO를 생성한다.
            ResponseDTO<String> response = ResponseDTO.<String>builder().data(message).build();
            return ResponseEntity.ok().body(response);
        }catch(Exception e){
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }

    }


}




