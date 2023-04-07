import React, { useState } from "react";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined"

function Todo(props){
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

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

        props.update(thisItem);
        props.calculate();
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