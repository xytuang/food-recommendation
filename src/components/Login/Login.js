import { Link, useNavigate } from 'react-router-dom'
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
        <div>
            <form>
                <div>
                    <input
                        placeholder='Enter your email'
                        type='email'
                        autoComplete='username'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder='Enter your password'
                        type='password'
                        autoComplete='current-password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>
                    Login
                </button>
            </form>
            <Link to='/register'>Sign up for an account here!</Link>
        </div>
    )
}

export default Login