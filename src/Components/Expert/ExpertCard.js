import React from 'react';
import { Link } from 'react-router-dom'
import UpvoteDownVoteExpert from './UpvoteDownVoteExpert'
import './ExpertCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ExpertCard(props) {
    const {expert} = props

    console.log(expert.name)

    const setViewExpertFlag = () => {
      window.localStorage.setItem('viewExpertFlag', 'true')
  }
    

  return (
      
    <div className="expert">
        {/* <div className='expert-img-container'>
          <img className='expert-img' src="https://picsum.photos/400" alt='Expert'/>
        </div> */}
        <div className='left-content'>
          <div  className='expert-text'>
              <Link onClick={setViewExpertFlag} className='expert-name-link' to={`/getexpert/${expert._id}`}>
                <h4 className='expert-name'>{expert.name}</h4>
              </Link>          
            <p className='expert-description'>{expert.descriptions[0].description}</p>
          </div>

          <div className='expert-socials'>
            <div className='expert-socials-links'>
              <div className='expert-twitter'>
                {expert.twitterLinks[0].twitterLink.length > 0 &&
                  <FontAwesomeIcon className='twitter-icon' icon={['fab', 'twitter']} />
                }
                {expert.twitterLinks[0].twitterLink.length > 0 &&
                  <a href={`https://twitter.com/${expert.twitterLinks[0].twitterLink}`}>@{expert.twitterLinks[0].twitterLink}</a>
                }            
              </div>
              <div className='expert-youtubeChannel'>
                {expert.youtubeChannels[0].youtubeChannel.length > 0 &&
                    <FontAwesomeIcon className='youtube-icon' icon={['fab', 'youtube']}/> 
                }
                {expert.youtubeChannels[0].youtubeChannel.length > 0 &&
                    <a href={expert.youtubeChannels[0].youtubeChannel}>YouTube Channel</a>
                }
                
              </div>
            </div>
          </div>

        </div>
          

        
          <div className='expert-category-rating'>
              <div className='expert-category'>
                <p>{expert.categories[0].category}</p>
              </div>
              <UpvoteDownVoteExpert expertid={expert._id} category={expert.categories[0].category} rating={expert.categories[0].rating}/>
          </div>


          
          {/* <div className='updated-date'>
            <p>Last updated: {new Date(expert.updatedAt).toLocaleDateString('en-US')}</p>
          </div> */}
    </div>
  );
}

export default ExpertCard;