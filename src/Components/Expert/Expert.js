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

    //   setTimeout(function(){console.log(experts.descriptions[0].description) }, 2000);

    return(
            <div className='expert'>
                
                <p>{experts.name}</p>
                {/* <p>{experts.description[0].description}</p> */}
            </div>
        
    )
}


export default Expert