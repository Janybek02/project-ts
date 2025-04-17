
import { Route, Routes, Navigate} from 'react-router-dom'
import UserDetail from './components/userDetail/UserDetail'
import './App.css'
import UserList from './components/userList/UserList'

const App = () =>  {
  return (
    <div className='w-full'>
      
      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path="/users/:id" element={<UserDetail/>} />
        
      </Routes>
     
    </div>
  )
}

export default App
