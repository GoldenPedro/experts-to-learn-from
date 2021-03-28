import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails';


const Description = (props) =>{
    const {description, expertId} = props


    return(
            <div className="expert-detail-card">
                
                <p>{description.description}</p>
                
                    <p>{description.rating}</p>

                    <UpvoteDownVoteExpertDetails field="descriptions" subfield="description" id={description._id} expertId={expertId} tag={description.description}/>

                
            </div>
        
    )
}


export default Description