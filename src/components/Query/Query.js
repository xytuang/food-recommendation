import { useState } from 'react'
import './Query.css'
import Restaurant from '../Restaurant/Restaurant'

const Query = () => {
    const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese']

    const [restaurantName, setRestaurantName] = useState('')
    const [distance, setDistance] = useState('1')
    const [cuisine, setCuisine] = useState('Chinese')
    const [rating, setRating] = useState('4')
    const [open, setOpen] = useState('true')
    const [sortBy, setSortBy] = useState('Relevance')
    const [searchResults, setSearchResults] = useState(() => {
        const storedData = localStorage.getItem('searchResults')
        return storedData ? JSON.parse(storedData) : null
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = 'http://127.0.0.1:5000/search'

        let data = {
            restaurantName,
            distance,
            cuisine,
            rating,
            open,
            sortBy
        }
        let response = await fetch(url, {
            'method' :'POST',
            "headers": {"Content-Type": "application/json"},
            'body' : JSON.stringify(data)
        })
        let res = await response.json()
        let restaurants = res.restaurants
        let newRestaurants = []
        const knownRestaurants = new Set()
        for (let i = 0; i < restaurants.length; i++) {
            let currString = restaurants[i].name.toLowerCase()
            if (!knownRestaurants.has(currString)) {
                knownRestaurants.add(currString)
                newRestaurants.push(restaurants[i])
            }
        }
        localStorage.setItem('searchResults', JSON.stringify(newRestaurants))
        setSearchResults(newRestaurants)
    }


    return (
        <div>
            <div className='container'>
                <form>
                    <label>Give me a name:</label>
                    <input type='text' 
                    onChange={(e) => {setRestaurantName(e.target.value)}} value={restaurantName}
                    className="input-fields"/>
                </form>
                <form>
                    <label>How far away? </label>
                    <input type='number'
                    className='input-fields'
                    onChange={(e) => {setDistance(e.target.value)}} value={distance}/>
                </form>
                <select className="input-fields" onChange={(e) => {setCuisine(e.target.value)}}>
                    {cuisines.map((element) => <option key={element} value={element}>{element}</option>)}
                </select>
                <select className="input-fields"onChange={(e) => {setRating(e.target.value)}}>
                    <option value={"1"}>1 star and above</option>
                    <option value={"2"}>2 star and above</option>
                    <option value={"3"}>3 star and above</option>
                    <option value={"4"}>4 star and above</option>
                    <option value={"5"}>5 star</option>
                </select>
                <select className="input-fields" onChange={(e) => {setOpen(e.target.value)}}>
                    <option value={"true"}>Open</option>
                    <option value={"false"}>Closed</option>
                </select>
                <select className="input-fields" onChange={(e) => {setSortBy(e.target.value)}}>
                    <option value="Cheapest">Cheapest</option>
                    <option value="Fastest">Fastest</option>
                    <option value="Rating">Rating</option>
                    <option value="Distance">Distance</option>
                </select>
                <button className="btn btn-blue" type="submit" onClick={handleSubmit}>Search!</button>
                </div>
                <div className="restaurants-container">
                    {searchResults != null ? searchResults.map((element) => <Restaurant restaurant={element} key={element._id}/>)
                    : "Search something!"}
                </div>
        </div>
    )
}

export default Query