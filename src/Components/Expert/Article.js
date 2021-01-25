import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import playSolid from '../../Assets/playSolid.svg'


const Article = (props) =>{
const {article} = props


    return(
            <div className="expert-detail-card">
                <p className="expert-detail-card-title">{article.article}</p>

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{article.rating}</p>
                    <div className='expert-detail-voting'>
                        <img className='upvote-icon' src={playSolid} alt='upvote' />
                        <img className='downvote-icon' src={playSolid} alt='downvote' />
                    </div>
                </div>
            </div>
        
    )
}


export default Article