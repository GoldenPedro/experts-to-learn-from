import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';

import playSolid from '../../Assets/playSolid.svg'


const BookRecommendation = (props) =>{
    const {bookRecommendation} = props


    return(
            <div className="expert-detail-card">
                
                <p>{bookRecommendation.bookRecommendation}</p>
                

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{bookRecommendation.rating}</p>

                    <div className='expert-detail-voting'>
                    <img className='upvote-icon' src={playSolid} alt='upvote' />
                    <img className='downvote-icon' src={playSolid} alt='downvote' />
                </div>
                </div>
                
            </div>
        
    )
}


export default BookRecommendation