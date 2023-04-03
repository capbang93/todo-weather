import React from "react";
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined"

// 함수형으로 작성
// function Todo(props) {
//         return (
//             <ListItem>
//                 <Checkbox checked={props.item.done}/>
//                 <ListItemText>
//                     <InputBase
//                      inputProps={{"aria-label":"naked"}}
//                      type="text"
//                      id={props.item.id}
//                      name={props.item.id}
//                      value={props.item.title}
//                      multiline={true}
//                      fullWidth={true}
//                     />
//                 </ListItemText>
//             </ListItem>
//         )
// }

// 클래스 형으로 작성 - 이건 초기버전까지만 작성되어 있음.

class Todo  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item:props.item, readOnly:true};
        this.delete = props.delete;
    }


    deleteEventHandler =()=> {
        this.delete(this.state.item);
    }

    offReadOnly =()=>{
        console.log("offReadOnl",this.state.readOnly);
        this.setState({readOnly:false},()=>{
            console.log("NOW ReadOnly",this.state.readOnly)
        });
    }

    enterKeyHandler =(e)=>{
        if(e.key === "Enter"){
            this.setState({readOnly:true});
        }
    }

    editEventHandler =(e)=>{
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
    }

    checkboxEventHandler =(e)=>{
        console.log("Check box event call");
        const thisItem = this.state.item;
        thisItem.done = thisItem.done ? false : true;
        this.setState({item:thisItem});
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox
                checked={item.done}
                onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                    inputProps={{"aria-label":"naked", readOnly:this.state.readOnly}}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    onClick={this.offReadOnly}
                    onChange={this.editEventHandler}
                    onKeyPress={this.enterKeyHandler}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete"
                    onClick={this.deleteEventHandler}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
//test
export default Todo;