import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'



const Expert = (props) =>{
    const [experts, setExperts] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://www.expertstolearnfrom.com/api/getexpert/${id}`)
          .then((res) => {
            setExperts(res.data)
            
          })
      }, []);

      setTimeout(function(){console.log(experts) }, 2000);
      // setTimeout(function(){console.log(experts.descriptions[0]) }, 2000);

      if (!experts.descriptions) {
        return <span>Loading...</span>
      }

    return(
            <div>
                
                <p>{experts.name}</p>

                <p>{experts.descriptions[0].description}</p>
                <p>{experts.twitterLinks[0].twitterLink}</p>
                <p>{experts.youtubeChannels[0].youtubeChannel}</p>

                <div>
                  
                </div>

            </div>
        
    )
}


export default Expert