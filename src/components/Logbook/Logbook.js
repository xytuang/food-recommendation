import { useEffect, useState } from 'react'
import { readFromList } from '../../firebase/database'
import './Logbook.css'

const Logbook = () => {
    const [visited, setVisited] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    useEffect(() => {
        readFromList('visited').then((response) => {
            if (response != null){
                setVisited(Object.values(response))
            }
        })
        readFromList('wishlist').then((response) => {
            if (response != null){
                setWishlist(Object.values(response))
            }
        })
    }, [])
    return (
        <div className='container'>
            <div className='list'>
                The places you have visited!
                {visited !== null ? visited.map((element) => <li key={element._id}>{element.name}</li>) : null}
            </div>
            <div className='list'>
                The places you want to visit!
                {wishlist !== null ? wishlist.map((element) => <li key={element._id}>{element.name}</li>) : null}
            </div>
        </div>
    )
}

export default Logbook