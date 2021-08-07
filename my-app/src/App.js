import React,{useState,useEffect} from 'react'
import Todolist from './Todolist';
import axios from 'axios';
import { Pagination } from 'antd';



const App = () =>{
const [task,setTask]=useState("");
const[todos,setTodos]=useState([])
const [userList,setUserList]=useState([])
const [activePage,setActivePage]=useState(1)
const changeHandler = e =>{
  setTask(e.target.value)
}
const submitHandler = e =>{
  e.preventDefault();
  // console.log(task)
  const newTodos=[...todos,task];
  setTodos(newTodos);
  setTask("");
}
const deleteHandler=(indexValue)=>{
  const newTodos = todos.filter((todo,index) => index !== indexValue);
  setTodos(newTodos);
}
useEffect(() => {
  axios ({ url: `https://reqres.in/api/users?page=${activePage}`, method: "GET" }).then((res)=>{
    console.log(res)
    setUserList(res.data.data)
  })
  
}, [])
  return (
    <div className="App">
      <center>
        <div className="card">
          <div className="card-body">
            <h2 className="card-tittle">To do List Apllication</h2>
            <form autoComplete="off"
            onSubmit={submitHandler}>
              <input size="30px" type="text" name="task" value={task} onChange={changeHandler} placeholder="What needs to be done?"/> &nbsp;&nbsp;
              <input type="submit" value="Add" name="Add"/>
            </form>

            
            <Todolist todolist={todos} deleteHandler={deleteHandler}/>
            <div>
              <table>
              
                { userList.map((item)=>{
                  return(
                  <div key={item.id}
                  >
                  <tr>
                     <img src={item.avatar} />
                  </tr>
                  <tr>
                   {item.first_name}{item.last_name
                   }  
                  </tr>
                  <tr>
                     {item.email}
                  </tr>
                  </div>
                  )
                })}
              </table>
              <Pagination size="small" total={10} />


            </div>
          </div>
        </div>
      </center>
    </div>
  )
}
export default App