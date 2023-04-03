import React, { Component } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';


class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.state = { item: { title: "" } };
        this.add = props.add;
    }

    onInputChange = (e) => {
        // 타이틀만 변경해도 되는지 테스트 해보기 
        const thisItems = this.state.item;
        thisItems.title = e.target.value;
        // 새롭게 생성한 thisItems를 통해서 item props를 변경
        this.setState({ item: thisItems });
        console.log(thisItems);
    }

    onButtonClick = () => {
        this.add(this.state.item);
        this.setState({ item: { title: "" } })
    }

    enterKeyEventHandler = (e) => {
        if (e.key == "Enter") {
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper style={{ margine: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder='Add Todo here'
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.onButtonClick}>
                            추가
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )


    }
}

export default AddTodo;