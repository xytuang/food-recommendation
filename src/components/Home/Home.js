import { useState } from 'react'
import { logout } from '../../firebase/auth'
import Query from '../Query/Query'
import Logbook from '../Logbook/Logbook'

const Home = () => {
    const [active, setActive] = useState('Query')
    return (
        <div>
            <div>
                <button onClick={() => setActive('Query')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>I want to eat at a new restaurant</button>
                <button onClick={() => setActive('Logbook')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>What have I eaten before?</button>
            </div>
            {active === 'Query' && <Query/>}
            {active === 'Logbook' && <Logbook/>}
            <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
        </div>
    )
}

export default Home