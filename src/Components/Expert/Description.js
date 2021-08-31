import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';
import './ExpertDetailsCardStyle.css'


const Description = (props) =>{
    const {description, expertId} = props


    return(
            <div className="expert-detail-card">
                <div className="left-content">
                    <p>{description.description}</p>
                    <p className="expert-detail-card-submitted">Submitted by: {description.submitted}</p>
                </div>
                
                
                <div className="expert-detail-voting-rating-wrapper">
                    <UpvoteDownVoteExpertDetails field="descriptions" subfield="description" rating={description.rating} id={description._id} expertId={expertId} tag={description.description}/>
                </div>

                  
                
            </div>
        
    )
}


export default Description