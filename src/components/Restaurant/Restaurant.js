import { useNavigate } from 'react-router-dom'

const Restaurant = ({restaurant}) => {
    let name = restaurant.name
    let rating = restaurant.weighted_rating_value
    let address = restaurant.address.street_addr + restaurant.address.street_addr_2
    let miles = restaurant.miles

    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
            <div>Name: {name}</div>
            <div>Rating: {Math.round(rating * 100)/ 100}</div>
            <div>Address: {address}</div>
            <div>Distance: {Math.round(miles * 100)/ 100} miles</div>
        </div>
    )
}

export default Restaurant