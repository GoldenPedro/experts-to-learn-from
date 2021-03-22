import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import playSolid from '../../Assets/playSolid.svg'


const Description = (props) =>{
    const {description} = props


    return(
            <div className="expert-detail-card">
                
                <p>{description.description}</p>
                

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{description.rating}</p>

                    <div className='expert-detail-voting'>
                    <img className='upvote-icon' src={playSolid} alt='upvote' />
                    <img className='downvote-icon' src={playSolid} alt='downvote' />
                </div>
                </div>
                
            </div>
        
    )
}


export default Description