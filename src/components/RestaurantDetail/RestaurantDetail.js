import { useParams } from 'react-router-dom'

const RestaurantDetail = () => {
    const id = useParams().id
    let restaurants = JSON.parse(localStorage.getItem('searchResults'))
    let currRestaurant = restaurants.find((element) => element._id === id)
    return (
        <div>
            <div>Name: {currRestaurant.name}</div>
            <div>Rating: {Math.round(currRestaurant.weighted_rating_value * 100)/ 100}</div>
            <div>Address: {currRestaurant.address.street_addr + currRestaurant.address.street_addr_2}</div>
            <div>Distance: {Math.round(currRestaurant.miles * 100)/ 100} miles</div>
            <label id='review'>Review: </label>
            <input type='text' labelid='review'/>
            <button>Add to visited list</button>            
            <button>Add to wish list</button>
        </div>
    )
}

export default RestaurantDetail