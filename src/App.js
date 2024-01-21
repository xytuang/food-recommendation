import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/auth'
import { useEffect } from 'react'
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail'
import './index.css'


function App() {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
    else if (user.emailVerified) {
      navigate('/home')
    }
  }, [user])
  return (
    <div className='container'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/restaurant/:id' element={<RestaurantDetail/>}/>

      </Routes>
    </div>
  );
}

export default App;
