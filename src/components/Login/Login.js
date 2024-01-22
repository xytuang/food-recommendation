import { useNavigate } from 'react-router-dom'
import { login } from '../../firebase/auth'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/home')
        }
        catch (error) {
            console.log(error)
        }
        
    }

    return (
        <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="login-labels" htmlFor="inline-email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="login-fields" id="inline-email" type="text" placeholder="Your email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="login-labels" htmlFor="inline-password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="login-fields" id="inline-password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
            <button className="login-btns" type="button" onClick={handleSubmit}>
                Sign In
            </button>
            <button className="login-btns" type="button" onClick={() => navigate('/register')}>
                Sign Up
            </button>
            </div>
        </div>
        </form>
    )
}

export default Login