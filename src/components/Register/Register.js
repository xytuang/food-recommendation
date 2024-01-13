import { register } from '../../firebase/auth'
import { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(email, password)
        }
        catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div>
            <form>
                <div>
                    <label id='email'>Email: </label>
                    <input
                        labelid='email'
                        placeholder='Enter your email'
                        type='email'
                        autoComplete='username'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label id='password'>Password: </label>
                    <input
                        labelid='password'
                        placeholder='Enter your password'
                        type='password'
                        autoComplete='new-password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Register