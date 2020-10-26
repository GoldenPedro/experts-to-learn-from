import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useParams, useHistory } from 'react-router-dom'


const PlantCard = (props) =>{
    //setting card state
    const[plant, setPlant] = useState([]);
    const history = useHistory()
    const { id } = useParams()
    //wrap axios in useEffect

    useEffect(()=>{
        axios.get(`https://chrisjcorbin-watermyplants.herokuapp.com/plants/plant/${id}`)
        .then(response=>{
            setPlant(response.data)
            console.log(response.data)
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR------>', error)
        })
    },[id])

    const deletePlant = () => {
        axios
        .delete(`https://chrisjcorbin-watermyplants.herokuapp.com/plants/plant/${id}`)
        .then(res => {
          history.push('/profile');
        })
        .catch(err => console.log(err));
      }


    return(
            <div className='plantCard'>
                
                <h2>Name: {plant.name}</h2>
                <p>Location: {plant.location}</p>
                <p>Species: {plant.species}</p>
                <p>Water every: {plant.schedule} days </p>
            </div>
        
    )
}


export default PlantCard