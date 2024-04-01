import { useEffect, useState } from "react";

function App() { 
  const [todo, setTodo] = useState('')
  const[todoList, setTodoList] = useState(() => {
    const todos = localStorage.getItem('todos')
    return JSON.parse(todos) ?? []
  })
  const [isEnter, setIsEnter] = useState(false)
  
  const handTodo = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setTodoList(prev => {
      const newTodoList = [...prev, todo]
      localStorage.setItem('todos', JSON.stringify(newTodoList))
      return [...prev, todo]
    })
    setTodo("")
  }

      
const handleDeleteTodo = (todo) => {
  setTodoList(prev => {
    const newTodoList = prev.filter(td => td !== todo)
    localStorage.setItem('todos', JSON.stringify(newTodoList))
    return newTodoList
  })
}

const handleAddWithKey = (e) => {
  if (e.key === 'Enter') {
   setIsEnter(true)
  }
  else{
    setIsEnter(false)
  }
}

useEffect(() => {
  handleAdd()
}, [isEnter])


console.log("aaaa");
  return (
    <div className="App">
      <input onChange={handTodo} onKeyDown={handleAddWithKey} value={todo}/>
      <button onClick={handleAdd}>Add</button>

    <ul>
      {todoList.map((todo, index) => <li key={index}>{todo} <button onClick={() => handleDeleteTodo(todo)}>X</button></li>)}
    </ul>
    
    </div>
  );
}

export default App;
