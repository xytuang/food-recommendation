import { useParams } from 'react-router-dom'
import { addToList } from '../../firebase/database'

const RestaurantDetail = () => {
    const id = useParams().id
    let restaurants = JSON.parse(localStorage.getItem('searchResults'))
    let currRestaurant = restaurants.find((element) => element._id === id)

    const handleAdd = async (list) => {
        await addToList(currRestaurant, list)
        console.log(`${currRestaurant.name} has been added to your ${list}!`)
    }

    return (
        <div>
            <div>Name: {currRestaurant.name}</div>
            <div>Rating: {Math.round(currRestaurant.weighted_rating_value * 100)/ 100}</div>
            <div>Address: {currRestaurant.address.street_addr + currRestaurant.address.street_addr_2}</div>
            <div>Distance: {Math.round(currRestaurant.miles * 100)/ 100} miles</div>
            <button onClick={() => handleAdd('visited')}>Add to visited list</button>            
            <button onClick={() => handleAdd('wishlist')}>Add to wish list</button>
        </div>
    )
}

export default RestaurantDetail