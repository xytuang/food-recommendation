import { useEffect, useState } from 'react'
import { addToList, deleteFromList, readFromList } from '../../firebase/database'
import './Logbook.css'

const Logbook = () => {
    const [visited, setVisited] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("running every second!")
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
        }, 1000)
        return () => clearInterval(interval)
    }, [visited, wishlist])

    const handleDelete = (id, list) => {
        deleteFromList(id, list)
        if (list === 'wishlist'){
            console.log("running in delete")
            let newWishlist = []
            for (let element of wishlist){
                if (element._id !== id) {
                    newWishlist.push(element)
                }
            }
            setWishlist(newWishlist)
        }
    }
    
    const handleMove = (id) => {
        const toMove = wishlist.find((element) => element._id === id)
        handleDelete(id, 'wishlist')
        addToList(toMove, 'visited')
    }
    return (
        <div className='container'>
            <div className='list'>
                Your visited list!
                {visited !== null ? 
                visited.map((element) => <li key={element._id}>{element.name}
                <button onClick={() => handleDelete(element._id, 'visited')}>Delete</button></li>) : null}
            </div>
            <div className='list'>
                Your wishlist!
                {wishlist !== null && wishlist.length !== 0 ? 
                wishlist.map((element) => <li key={element._id}>{element.name}
                <button onClick={() => handleDelete(element._id, 'wishlist')}>Delete</button>
                <button onClick={() => handleMove(element._id)}>Move to visited!</button></li>) : null}
            </div>
        </div>
    )
}

export default Logbook