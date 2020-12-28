import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'



const Tweets = (props) =>{
    const {tweet} = props


    return(
            <div>
                
                <p>{tweet.tweet}</p>
                <p>{tweet.rating}</p>

            </div>
        
    )
}


export default Tweets