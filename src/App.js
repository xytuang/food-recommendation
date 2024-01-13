import { Route, Routes, useNavigate } from 'react-router-dom'
import Query from './components/query'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/auth'
import { useEffect } from 'react'


function App() {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user == null) {
      navigate('/')
    }
    else if (user.emailVerified) {
      navigate('/home')
    }
  }, [user])
  return (
    <div>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Query/>}/>
      </Routes>
    </div>
  );
}

export default App;
