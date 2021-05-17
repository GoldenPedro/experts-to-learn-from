import React from 'react'
import UpvoteDownVoteExpertDetails from './UpvoteDownVoteExpertDetails'

const Article = (props) =>{
const {article, expertId} = props


    return(
            <div className="expert-detail-card">
                <p>{article.articleTitle}</p>
                <p className="expert-detail-card-title">{article.article}</p>

                <div className="expert-detail-voting-rating-wrapper">
                    <p>{article.rating}</p>
                    <UpvoteDownVoteExpertDetails field="articles" subfield="article" id={article._id} expertId={expertId} tag={article.article}/>
                </div>
            </div>
        
    )
}


export default Article