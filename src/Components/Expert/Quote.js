import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'



const Quote = (props) =>{
    const {quote} = props


    return(
            <div>
                
                <p>{quote.quote}</p>
                <p>{quote.rating}</p>

            </div>
        
    )
}


export default Quote