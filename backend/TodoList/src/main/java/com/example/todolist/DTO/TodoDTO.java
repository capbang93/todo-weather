package com.example.todolist.DTO;


import com.example.todolist.Entity.TodoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



// 데이터 수정을 위한 DTO
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoDTO {
    private String id;
    private String title;
    private boolean done;

    // TodoDTO는 TodoEntity를 받아서 생성 된다. TodoEntity값을 그대로 가진다.
    public TodoDTO(final TodoEntity entity)
    {
        this.id= entity.getId();
        this.title= entity.getTitle();
        this.done= entity.isDone();
    }

    public static TodoEntity toEntity(final TodoDTO dto) {
        return TodoEntity.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .done(dto.isDone()).build();
    }
}
