import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'

const BookRecommendation = (props) =>{
    const {bookRecommendation, expertId} = props

    const conditionalLinkRender = () => {
        if (bookRecommendation.amazonLink.length !== 0) {
            return <a className="expert-detail-card-url" href={bookRecommendation.amazonLink}>{bookRecommendation.bookRecommendation}</a>
        } else {
            return <p className="expert-detail-card-text">{bookRecommendation.bookRecommendation}</p>
        }
    }

    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    {conditionalLinkRender()}
                    <p className="expert-detail-card-author">by {bookRecommendation.author}</p>
                    <p className="expert-detail-card-submitted">Submitted by: {bookRecommendation.submitted}</p>
                </div>
                
                
                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails field="bookRecommendations" subfield="bookRecommendation" rating={bookRecommendation.rating} id={bookRecommendation._id} expertId={expertId} tag={bookRecommendation.bookRecommendation}/>         
                </div>


                    
            </div>
        
    )
}


export default BookRecommendation