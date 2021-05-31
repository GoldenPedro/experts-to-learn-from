import React from 'react';
import { Link } from 'react-router-dom'
import UpvoteDownVoteExpert from './UpvoteDownVoteExpert'

function ExpertCard(props) {
    const {expert} = props

    console.log(expert.name)

    const setViewExpertFlag = () => {
      window.localStorage.setItem('viewExpertFlag', 'true')
  }
    

  return (
      
    <div className="expert">
        <div className='expert-img-container'>
          <img className='expert-img' src="https://picsum.photos/400" alt='Expert'/>
        </div>
        <div  className='expert-text'>
            <Link onClick={setViewExpertFlag} className='expert-name-link' to={`/api/getexpert/${expert._id}`}>
              <h4 className='expert-name'>{expert.name}</h4>
            </Link>          
          
          <p className='expert-description'>{expert.descriptions[0].description}</p>
          <div className='expert-socials'>
            <a className='expert-twitter' href={expert.twitterLinks[0].twitterLink}>{expert.twitterLinks[0].twitterLink}</a>       
            <a className='expert-youtubeChannel' href={expert.youtubeChannels[0].youtubeChannel}>{expert.youtubeChannels[0].youtubeChannel}</a>
          </div>
        </div>
        
        <div className='expert-category-rating'>
          <div className='expert-category'>
            <p>{expert.categories[0].category}</p>
          </div>
          {/* <div className='expert-voting'>
            <img className='upvote-icon' src={playSolid} alt='upvote' />
            
            <img className='downvote-icon' src={playSolid} alt='downvote' />
          </div> */}

          <UpvoteDownVoteExpert expertid={expert._id} category={expert.categories[0].category} rating={expert.categories[0].rating}/>
        </div>
    </div>
  );
}

export default ExpertCard;