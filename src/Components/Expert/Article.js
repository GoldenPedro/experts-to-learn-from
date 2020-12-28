import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'


const Article = (props) =>{
const {article} = props


    return(
            <div>
                <p>{article.article}</p>
                <p>{article.rating}</p>
            </div>
        
    )
}


export default Article