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
                    <input
                        labelid="email"
                        placeholder="Enter your email"
                        type="email"
                        autoComplete="username"
                        required
                        className="login-fields"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        labelid="password"
                        placeholder="Enter your password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="login-fields"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit} className="login-btns">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default Register