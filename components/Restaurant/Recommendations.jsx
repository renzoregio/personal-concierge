import s from "./recommendations.module.css"
import { BackToMain } from "../Home";

import fetch from 'isomorphic-unfetch';
import { useState } from "react";


import { faDollarSign, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

const Recommendations = () => {
    const [searchInitiated, setSearchInitiated] = useState(false)
    const cuisines=["burgers", "japanese", "thai", "fish and chips", "american"]
    const [restaurants, setRestaurants] = useState([])
    const getRecommendations = async(term) => {
        try {
            const rawData = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=8&location=vancouver&term=${term}`, {
                headers: {
                    Authorization: `Bearer ${process.env.YELP_KEY}`,
                    Origin: "localhost",
                    withCredentials: true,
                }
            })
            setSearchInitiated(true)
            const res = await rawData.json();
            setRestaurants(res.businesses)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={s.container}>
            <form className={s.searchForm}>
                <button className={s.searchBtn}>
                    <FontAwesomeIcon icon={faSearch} size="2x" />
                </button>
                <input className={s.searchInput} type="text" placeholder="Search..." />
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
                    <div className={s.restaurantContainer}>
                        <div className={s.restaurantTextContainer}>
                            <span className={s.restaurantName}>{restaurant.name}</span>
                            <div className={s.restaurantRatingsContainer}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className={s.restaurantRatingsContainer}>
                                <FontAwesomeIcon icon={faDollarSign} />
                                <FontAwesomeIcon icon={faDollarSign} />
                                <FontAwesomeIcon icon={faDollarSign} />
                            </div>
                            <div className={s.restaurantRatingsContainer}>
                                <span className={s.restaurantTransaction}>Delivery</span>
                                <span className={s.restaurantTransaction}>Pickup</span>
                            </div>
                            <span className={s.restaurantAddress}>1058 Folsom St, San Francisco, CA 94103</span>

                        </div>
                        <img className={s.restaurantImage} src={restaurant.image_url} />
                    </div>
                ))}
            </div>
            <BackToMain />
        </div>
    )
}

export default Recommendations