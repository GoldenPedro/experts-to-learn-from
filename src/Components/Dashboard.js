import React, { useState, useEffect } from 'react';
import ExpertCard from './Expert/ExpertCard'
import axios from 'axios';


const defaultCategorySearch = {
  category: ''
}

const categories = []


function Dashboard() {
  const [experts, setExperts] = useState([])
  const [categorySearch, setCategorySearch] = useState(defaultCategorySearch)
    const [categoriesState, setCategoriesState] = useState(categories)

  useEffect(() => {
    axios.get('http://www.expertstolearnfrom.com/api/expertlist/photography')
      .then((res) => {
        console.log(res.data)
        setExperts(res.data)
        console.log(experts)
      })
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
    })
}

  return (
    <div className="dashboard">
        <h1>Experts To Learn From</h1>
        {experts.map(expert => (
          <ExpertCard expert={expert} key={expert._id} />
        ))}

    <div className='select-category-form'>
            <form onSubmit={search}>
                <label>Which category would you like to add a new Expert in? * &nbsp;
                    <input value={categorySearch.category} onChange={handleSearchChanges} placeholder='Search category' name="category" type='text' />
                </label>
                <button>Search</button>
            </form>

            {
                categoriesState.map((item) => (
                        <p id={item} onClick={selectCategory}>{item}</p>
                ))
            }
        </div>
    </div>
  );
}

export default Dashboard;
