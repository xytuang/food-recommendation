import { useState } from 'react'
import { logout } from '../../firebase/auth'
import Query from '../Query/Query'
import Logbook from '../Logbook/Logbook'
import './Home.css'

const Home = () => {
    const [active, setActive] = useState('Query')
    return (
        <div>
            <div className='parent-button'>
                <button onClick={() => setActive('Query')}>I want to eat at a new restaurant</button>
                <button onClick={() => setActive('Logbook')}>What have I eaten before?</button>
            </div>
            {active === 'Query' && <Query/>}
            {active === 'Logbook' && <Logbook/>}
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home