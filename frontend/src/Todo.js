import React, { useState } from "react";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined"

function Todo(props){
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);
    const [itemColor, setItemColor] = useState("");

    const deleteEventHandler = () => {
        props.delete(item);
    }

    const offReadOnly = () => {
        setReadOnly(false);
    }

    const enterKeyHandler = (e) => {
        if (e.key === "Enter") {
            setReadOnly(true);
            props.update(item);
            console.log("엔터 누르고 db에 반영됨!");
        }
    }

    const editEventHandler = (e) => {
        const thisItem = { ...item };
        thisItem.title = e.target.value;
        setItem(thisItem);
    }

    function checkboxEventHandler(){
        const thisItem = { ...item };
        thisItem.done = thisItem.done ? false : true;    
        setItem(thisItem);
        setReadOnly(true);
        // DB에 반영까지는 정확하게 이루어짐.
        props.update(thisItem);
        // update시, setItem이 동작하고, Item이 변경되면 CAL이 자동으로 동작하기에 굳이 여기서 수행할 필요없음.
        //props.calculate();
        setItemColor(thisItem.done ? "linear-gradient(to right, #a6c0fe, #f68084)" : "white");
    }

    return (
        <ListItem>
            <Checkbox
                checked={item.done}
                onChange={checkboxEventHandler}
            />
            <ListItemText>
                <InputBase
                    inputProps={{ "aria-label": "naked", readOnly: readOnly }}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    onClick={offReadOnly}
                    onChange={editEventHandler}
                    onKeyPress={enterKeyHandler}
                    style={{background: itemColor}}
                    // 위의 스타일 부분을 추가해줍니다. 그라데이션의 시작 색상(#a6c0fe)과 끝 색상(#f68084)을 조정하여 원하는 그라데이션을 적용할 수 있습니다.
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
            
        </ListItem>
    )
}

export default Todo;