import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import playSolid from '../../Assets/playSolid.svg'

const Video = (props) =>{
    const {video} = props


    return(
            <div className="expert-detail-card">
                
                <p>{video.video}</p>
                <p>{video.rating}</p>

                <div className='expert-voting'>
                    <img className='upvote-icon' src={playSolid} alt='upvote' />
                    <img className='downvote-icon' src={playSolid} alt='downvote' />
                </div>
            </div>
        
    )
}


export default Video