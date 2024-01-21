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
        <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email" type="text" placeholder="Your email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"/>
          </div>
        </div>
        <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={handleSubmit}>
                Sign In
            </button>
            <Link className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" to='/register'>Sign up</Link>
            </div>
        </div>
        </form>
    )
}

{/* <div>
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
    <button onClick={handleSubmit} classNameName='btn'>
        Login
    </button>
</form>
<Link to='/register'>Sign up for an account here!</Link>
</div> */}

export default Login