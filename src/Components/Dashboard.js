import React, { useState, useEffect } from 'react';
import ExpertCard from './Expert/ExpertCard'
import axios from 'axios';
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const defaultCategorySearch = {
  category: ''
}

const categories = []
const defaultRandomCategory = ""


function Dashboard() {
  // const temp = [{
  //   _id: "6070fde9fa8bb5a05dcff08e",
  //   categories: [{category: "photography", rating: 1}],
  //   descriptions: [{description: "Best coder ever", rating: 2, _id: "6070fde9fa8bb5a05dcff08a"}],
  //   name: "Alejandro Garcia",
  //   twitterLinks: [{twitterLink: "pedrocasuso", rating: 1, _id: "6070fde9fa8bb5a05dcff08b"}],
  //   updatedAt: "2021-05-17T03:14:25.360Z",
  //   youtubeChannels: [{youtubeChannel: "Lattice Gaming", rating: 1, _id: "6070fde9fa8bb5a05dcff08c"}]
  // }]

  const [experts, setExperts] = useState([])
  const [categorySearch, setCategorySearch] = useState(defaultCategorySearch)
  const [categoriesState, setCategoriesState] = useState(categories)

  useEffect(() => {
        axios.get(`http://www.expertstolearnfrom.com/api/expertlist/`)
          .then(res => {
            setExperts(res.data)
          })

      console.log(experts)

    window.localStorage.setItem('viewExpertFlag', '')
  }, []);

  const search = (evt) => {
    evt.preventDefault();
    console.log(defaultCategorySearch.category)
    axios.post('http://www.expertstolearnfrom.com/api/categories', categorySearch)
    .then(res => {
        console.log(res.data);
        setCategoriesState(res.data)
    })
}

const handleSearchChanges = (evt) => {
    const { name, value } = evt.target;
    setCategorySearch({ ...categorySearch, [name]: value });
}

const selectCategory = (evt) => {
    console.log(evt.target.id)
    axios.get(`http://www.expertstolearnfrom.com/api/expertlist/${evt.target.id}`)
    .then(res => {
      console.log(res.data)
      setExperts(res.data)
      window.sessionStorage.setItem('savedCategory', evt.target.id)
    })
}

  return (
    <div className="dashboard">
        <h1 className='main-title'>Experts To Learn From</h1>
        

      <div className='select-category-form'>
        <div className='select-category-search-form'>
            <form onSubmit={search}>
                  <input value={categorySearch.category} onChange={handleSearchChanges} placeholder='Search category' name="category" type='text' />
                <button className='search-button'><FontAwesomeIcon  icon="search" /></button>
            </form>
        </div>
              
              <div className='category-list'>
                {
                    categoriesState.map((item) => (
                            <p className="category" id={item} onClick={selectCategory}>{item}</p>
                    ))
                }
              </div>
      </div>

        {experts.map(expert => (
          <ExpertCard expert={expert} key={expert._id} />
        ))}
    </div>
  );
}

export default Dashboard;
