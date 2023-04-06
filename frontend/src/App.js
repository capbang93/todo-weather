import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';
import {call, signout} from './service/ApiService'

//함수형 방식

// function App() {
//   const [items, setItems] = useState([
//     { id: 0, title: "Todo 1 ", done: true },
//     { id: 1, title: "Todo 2 ", done: false },
//   ]);
  
//   const [todoItems, setTodoItems] = useState("");

//   // add 함수 추가
//   const add = (item) => {
//     const thisItems = items;
//     item.id = "ID-" + thisItems.length;//key를 위한 id 추가
//     item.done = false;
//     thisItems.push(item);
//     setItems(thisItems);
//     setTodoItems(items.length > 0 && (
//       <Paper style={{ margin: 16 }}>
//         <List>
//           {items.map((item, idx) => (
//             <Todo item={item} key={item.id} />
//           ))}
//         </List>
//       </Paper>
//     ));
//     console.log(items);
//   }

//   useEffect(() => {
//     setTodoItems(items.length > 0 && (
//       <Paper style={{ margin: 16 }}>
//         <List>
//           {items.map((item, idx) => (
//             <Todo item={item} key={item.id} />
//           ))}
//         </List>
//       </Paper>
//     ))
//   }, []);

//   return (
//     <div className="App">
//       <Container maxWidth="md">
//         <AddTodo add={add} />
//         <div className="TodoList">{todoItems}</div>
//       </Container>
//     </div>
//   );

// }

// export default App;


class App extends React.Component {
  constructor(props) { // 매개변수 props 생성자
    super(props);  // 매개변수 props 초기화
    this.state = {
      // item에 item.id, item.title, item.done 매개변수 이름과 값 할당
      items: [],
      loading: true,
    };
  }

  // add 함수 추가
  add = (item) =>{
    call("/todo","POST",item).then((response) =>
      this.setState({items:response.data})
    );
  }
    
  //삭제 
  delete = (item)=>{
    call("/todo","DELETE",item).then((response) =>
      this.setState({items:response.data})
    );
  }

  update = (item) =>{
    call("/todo","PUT",item).then((response) =>
    this.setState({items:response.data})
    );
  }

    // 페이지 돔 마운트가 일어나고 랜더링 되기 전에 실행된다.
  componentDidMount(){
    call("/todo","GET",null).then((response) =>
    this.setState({items:response.data, loading:false})
    );
  }

  render() {
    // todoItems에 length가 0보다 크다면 true이므로 &&뒤에 값을 넘겨 준다.

    var todoItems = this.state.items.length > 0 && (
      // 자바스크립트가 제공하는 map 함수를 이용해서 배열을 반복해 <Todo/> 컴포넌트를 여러 개 생성한다.
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
          ))}
        </List>
      </Paper>
    );

    //navigationBar
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify='space-between' container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>logout</Button>
              </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    );

    // loading 중이 아닐 때
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );

    // loading 중일 때
    var loadingPage = <h1>로딩중..</h1>
    var content = loadingPage;

    if(!this.state.loading){
      content = todoListPage;
    }

    // 생성된 컴포넌트 JSX를 리턴한다.
    return (
      <div className='App'>
        {content}
      </div>
    );
  }
}

export default App;