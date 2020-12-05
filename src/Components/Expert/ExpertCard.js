import React from 'react';
import playSolid from '../../Assets/playSolid.svg'

function ExpertCard(props) {
    const {expert} = props

    console.log(expert.name)

  return (
    <div className="expert">
        <div className='expert-img-container'>
          <img className='expert-img' src="" alt='Expert'/>
        </div>
        <div  className='expert-text'>
          <h4 className='expert-name'>{expert.name}</h4>
          <p className='expert-description'>{expert.descriptions[0].description}</p>
          <a className='expert-twitter' href={expert.twitterLinks[0].twitterLink}><p>Twitter</p></a>
          <a className='expert-youtubeChannel' href={expert.youtubeChannels[0].youtubeChannel}><p>YouTube</p></a>
        </div>
        
        <div className='expert-category-rating'>
          <div className='expert-category'>
            <p>{expert.categories[0].category}</p>
          </div>
          <div className='expert-voting'>
            <img className='upvote-icon' src={playSolid} alt='upvote' />
            <p className='expert-rating'>{expert.categories[0].rating}</p>
            <img className='downvote-icon' src={playSolid} alt='downvote' />
          </div>
        </div>
    </div>
  );
}

export default ExpertCard;