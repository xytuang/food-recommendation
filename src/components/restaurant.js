const Restaurant = ({name, rating, address, miles}) => {

    return (
        <div>
            <div>Name: {name}</div>
            <div>Rating: {Math.round(rating * 100)/ 100}</div>
            <div>Address: {address}</div>
            <div>Distance: {Math.round(miles * 100)/ 100} miles</div>
        </div>
    )
}

export default Restaurant