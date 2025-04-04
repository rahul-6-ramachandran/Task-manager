
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Taskview from './components/task/Taskiew'
import Create from './components/task/Create'

function App() {
 
  return (
    <>
         <div className='App'>
          <Routes>
            <Route index  path='/' element={<Login/>}/>
            <Route path='signup' element={<Signup/>}></Route>
            <Route path='taskboard/:id' element={<Taskview/>}></Route>
            <Route path='/createTask/:id' element={<Create/>}></Route>
          </Routes>
         </div>
    
    </>
  )
}

export default App
