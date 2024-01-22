import { useState } from 'react'
import { logout } from '../../firebase/auth'
import Query from '../Query/Query'
import Logbook from '../Logbook/Logbook'

const Home = () => {
    const [active, setActive] = useState('Query')
    return (
        <div>
            <div>
                <button onClick={() => setActive('Query')} className="btn btn-blue">I want to eat at a new restaurant</button>
                <button onClick={() => setActive('Logbook')} className="btn btn-blue">What have I eaten before?</button>
            </div>
            {active === 'Query' && <Query/>}
            {active === 'Logbook' && <Logbook/>}
            <button onClick={logout} className="btn btn-blue">Logout</button>
        </div>
    )
}

export default Home