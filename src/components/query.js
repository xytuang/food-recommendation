import { useState } from 'react'
import './query.css'
import Restaurant from './restaurant'

const Query = () => {
    const cuisines = ['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese']

    const [restaurantName, setRestaurantName] = useState('')
    const [distance, setDistance] = useState('1')
    const [cuisine, setCuisine] = useState('Chinese')
    const [rating, setRating] = useState('4')
    const [open, setOpen] = useState('true')
    const [sortBy, setSortBy] = useState('Relevance')
    const [hasSearched, setSearched] = useState(false)
    const [searchResults, setSearchResults] = useState(null)



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
        console.log(restaurants)
        setSearchResults(restaurants)
        setSearched(true)
    }


    return (
        <div>
            <div className='container'>
                <form>
                    <label>Give me a name:</label>
                    <input type='text' 
                    onChange={(e) => {setRestaurantName(e.target.value)}} value={restaurantName}/>
                </form>
                <form>
                    <label>How far away? </label>
                    <input type='number'
                    onChange={(e) => {setDistance(e.target.value)}} value={distance}/>
                </form>
                <select onChange={(e) => {setCuisine(e.target.value)}}>
                    {cuisines.map((element) => <option key={element} value={element}>{element}</option>)}
                </select>
                <select onChange={(e) => {setRating(e.target.value)}}>
                    <option value={'1'}>1 star and above</option>
                    <option value={'2'}>2 star and above</option>
                    <option value={'3'}>3 star and above</option>
                    <option value={'4'}>4 star and above</option>
                    <option value={'5'}>5 star</option>
                </select>
                <select onChange={(e) => {setOpen(e.target.value)}}>
                    <option value={'true'}>Open</option>
                    <option value={'false'}>Closed</option>
                </select>
                <select onChange={(e) => {setSortBy(e.target.value)}}>
                    <option value='Cheapest'>Cheapest</option>
                    <option value='Fastest'>Fastest</option>
                    <option value='Rating'>Rating</option>
                    <option value='Distance'>Distance</option>
                </select>
                <button type='submit' onClick={handleSubmit}>Search!</button>
                </div>
                <div className='restaurants-container'>
                    {hasSearched ? searchResults.map(
                        (element) => <Restaurant name={element.name} 
                                            rating={element.weighted_rating_value}
                                            address={element.address.street_addr + element.address.street_addr_2}
                                            miles={element.miles}
                                            key={element._id}/>) 
                    : "Search something!"}
                </div>
        </div>
    )
}

export default Query