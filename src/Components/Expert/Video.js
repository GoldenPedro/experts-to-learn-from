import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'



const Video = (props) =>{
    const {video} = props


    return(
            <div>
                
                <p>{video.video}</p>
                <p>{video.rating}</p>

            </div>
        
    )
}


export default Video