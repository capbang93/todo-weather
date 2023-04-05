import React from 'react';
import Hello from './Hello';
import './App.js'
import Todo from './Todo';
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from './AddTodo';

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
  constructor(props) {
    // 매개변수 props 생성자
    super(props); // 매개변수 props 초기화
    this.state = {
      // item에 item.id, item.title, item.done 매개변수 이름과 값 할당
      items: [
        { id: "0", title: "Todo 1", done: false },
        { id: 1, title: "Todo 2", done: false },
      ],
    };
  }

  add = (item) =>{
    useCallback("/todo")

    const thisItems = this.state.items;
    item.id = "ID-"+ thisItems.length; // key를 위한 ID추가
    item.done = false ;
    thisItems.push(item);
    // 새롭게 생성한 thisItems를 통해서 item props를 변경
    this.setState({items: thisItems});
    console.log("items:", this.state.items);
  }  




  //삭제 
  delete = (item)=>{
    const thisItems = this.state.items;
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({items:newItems},()=>{
    console.log("items",this.state.items);
    });
  }



  render() {
    // todoItems에 length가 0보다 크다면 true이므로 &&뒤에 값을 넘겨 준다.

    // 삼항연산자도 사용 가능하다
    var todoItems = this.state.items.length > 0 && (
      // 자바스크립트가 제공하는 map 함수를 이용해서 배열을 반복해 <Todo/> 컴포넌트를 여러 개 생성한다.
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} />
          ))}
        </List>
      </Paper>
    );

    // 생성된 컴포넌트 JSX를 리턴한다.
    return (<div className="App">
      <Container maxWidth="md">
        <AddTodo add={this.add}/>
      </Container>
      <div className='TodoList'>{todoItems}</div>
      </div>
    
    );
  }
}

export default App;