import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import playSolid from '../../Assets/playSolid.svg'

const Tweets = (props) =>{
    const {tweet} = props


    return(
            <div className="expert-detail-card">
                
                <p>{tweet.tweet}</p>
                <p>{tweet.rating}</p>

                <div className='expert-voting'>
                    <img className='upvote-icon' src={playSolid} alt='upvote' />
                    <img className='downvote-icon' src={playSolid} alt='downvote' />
                </div>
            </div>
        
    )
}


export default Tweets