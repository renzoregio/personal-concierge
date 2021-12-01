import s from "./recommendations.module.css"
import { BackToMain } from "../Home";
import { Nav } from "../Nav";
import fetch from 'isomorphic-unfetch';
import { useRef, useState } from "react";

import { faSearch, faStar, faStarHalf, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';

const Recommendations = () => {
    const cuisines=["burgers", "japanese", "thai", "fish and chips", "american"]
    const [ratingsArr, setRatingsArr] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [searchInitiated, setSearchInitiated] = useState(false)
    const searchInputRef = useRef(null);


    const getRecommendations = async(term) => {
        try {
            const rawData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=12&location=vancouver&term=${term}`, {
                headers: {
                    Authorization: `Bearer ${process.env.YELP_KEY}`,
                    Origin: "localhost",
                    withCredentials: true,
                }
            })
            const res = await rawData.json();
            let businesses = res.businesses;

            setRatingsArr([])
            const ratings = businesses.map(business => (business.rating))
            ratings.forEach(rating => getRating(rating))

            setRestaurants(businesses);

        } catch (error) {
            console.log(error)
        }
    }

    const searchRecommendations = async (e) => {
        e.preventDefault()
        const { current: { value }} = searchInputRef;
        await getRecommendations(value);
        searchInputRef.current.value = ""
        setSearchInitiated(false)
    }
    const getRating = (rating) => {
        const stars = []
        const ratingArr = rating.toString().split(".")
        for(let i = 0; i < ratingArr.length; i++){
            let num = +ratingArr[i]
            if(i === 0){
                while(num > 0){
                    stars.push("star")
                    num--
                }
            } else {
                stars.push(true);
            } 
        }
        setRatingsArr(prevState => [...prevState, stars])
    }



    return (
        <div className={s.container}>
        <Nav />
            <form className={s.searchForm}>
                { !searchInitiated && 
                    <a onClick={() => setSearchInitiated(true)} className={s.searchBtn}>
                        <FontAwesomeIcon icon={faSearch} size="2x" />
                    </a>
                }
                { searchInitiated && 
                    <>
                        <input ref={searchInputRef} className={s.searchInput} type="text" placeholder="Search..." />
                        <button onClick={(e) => searchRecommendations(e)} className={s.utensilsBtn}>
                            <FontAwesomeIcon icon={faUtensils}  />
                        </button>
                    </>
                }
            </form>
            <div className={s.searchCategoriesContainer}>
                { cuisines.map((cuisine, i) => (
                    <div onClick={() => getRecommendations(cuisines[i])} key={i} className={s.categoryBubble}>
                        <span>{cuisine}</span>
                    </div>
                ))}
            </div>
            <div className={s.restaurantsContainer}>
                {restaurants.map((restaurant, i) => (
                    <a href={restaurant.url} target="_blank" key={restaurant.id}className={s.restaurantContainer}>
                        <div className={s.restaurantTextContainer}>
                            <span className={s.restaurantName}>{restaurant.name}</span>
                            <div className={s.restaurantRatingsContainer}>
                                { ratingsArr.length === 12 && ratingsArr[i].map((rating, i) => {
                                    if(rating === true){
                                        return <FontAwesomeIcon icon={faStarHalf} key={i} />
                                    } else if (rating === "star") {
                                        return <FontAwesomeIcon icon={faStar} key={i}/>
                                    }
                                })}
                            </div>
                            <div className={s.restaurantRatingsContainer}>
                                {restaurant.price}
                            </div>
                            <div className={s.restaurantRatingsContainer}>
                                { restaurant.transactions.map((transaction, i) => (
                                    <span key={i} className={s.restaurantTransaction}>{transaction}</span>
                                ))} 
                            </div>
                            <span className={s.restaurantAddress}>{restaurant.location.address1}, {restaurant.location.city} {restaurant.location.zip_code}</span>

                        </div>
                        <img className={s.restaurantImage} src={restaurant.image_url} />
                    </a>
                ))}
            </div>
            <BackToMain />
        </div>
    )
}

export default Recommendations