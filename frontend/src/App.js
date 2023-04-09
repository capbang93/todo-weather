import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography} from "@material-ui/core";
import Rating from '@mui/material/Rating';
import './App.css';
import { call, signout, infoedit_route } from './service/ApiService'
import Weather from './Weathers';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemcomplete, setItemComplete] = useState(0);


  const add = (item) => {
    call("/todo", "POST", item).then((response) =>
      setItems(response.data)
    );
  }

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      setItems(response.data)
    );
  }

  const update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      setItems(response.data)
    );
  }


  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  
  useEffect(() => {
    // items 업데이트 이후 CalculateAll 함수 호출
    if (items.length > 0) {
      CalculateAll();
    }
  }, [items]);

  // 아이템이 전부 완료되면 축하메세지 출력
  useEffect(() => {
    // items 업데이트 이후 CalculateAll 함수 호출
    if (itemcomplete == 100) {
      alert('축하드립니다!\n오늘의 할일을 전부 완료하셨군요!')
    }
  }, [itemcomplete]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

// 전체 삭제
const handleDeleteAll = () => {
  if (items.length > 0) {
    
    items.map((item, idx) => {
      console.log(item.done);
      if(item.done == true)
      {
        console.log("트루 삭제")
        deleteItem(item);
      }
    });
  }
}

// 완료도 계산
const CalculateAll = () => {
  if (items.length > 0) {
    console.log(items.length)
    let completedItemsCount = 0; 
    items.map((item, idx) => {
      console.log(item.done);
      if(item.done === true) 
      {
        completedItemsCount++; 
      }
    });

    // Calculate 
    const completionPercentage = (completedItemsCount / items.length) * 100;
    setItemComplete(completionPercentage);
    console.log(`Completion Percentage: ${completionPercentage}%`);

  }
}

  // Todo 아이템 계산
  var todoItems = currentItems.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {currentItems.map((item, idx) => (
          <Todo item={item} key={item.id} delete={deleteItem} update={update} />
        ))}
      </List>
    </Paper>
  );

  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent='space-between' container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
          <Button color="inherit" onClick={infoedit_route}>회원정보 수정</Button>
            <Button color="inherit" onClick={signout}>로그아웃</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  var todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
      <Weather/>
        <Typography component='legend'><h3>📜오늘의 Todo 진행도 : {itemcomplete.toFixed(1)}%</h3></Typography>
        <Rating name='read-only' value={itemcomplete/20} precision={0.5} readOnly />
        <AddTodo add={add} />
        {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
        <div className='TodoList'>{todoItems}</div>
      </Container>
      <div className='Pagination'>
        {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (v, i) => (
          <Button key={i+1} onClick={() => setCurrentPage(i+1)}>
            {i+1}
          </Button>
        ))}
        {items.length > 0 && (
              <Button onClick={handleDeleteAll} 
                    variant="contained" 
                    color="secondary"
                    size="medium"
                    style={{ marginLeft: '16px' }}>
              완료한 항목 삭제⚡
            </Button>
        )}
      </div>
    </div>
  );

  var loadingPage = <h1>로딩중..</h1>
  var content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return (
    <div className='App'>
      {content}
    </div>
  );
}

export default App;
