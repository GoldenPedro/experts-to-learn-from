import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'



const BookRecommendation = (props) =>{
    const {bookRecommendation} = props


    return(
            <div>
                
                <p>{bookRecommendation.bookRecommendation}</p>
                <p>{bookRecommendation.rating}</p>

            </div>
        
    )
}


export default BookRecommendation