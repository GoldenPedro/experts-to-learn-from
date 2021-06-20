import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SelectCategoryForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const defaultCategorySearch = {
    category: ''
}

const defaultNewCategoryText = {
    newCategory: ''
}

const categories = []

const SelectCategoryForm = (props) =>{
    const {values, handleChange, nextStep, saveCategory} = props
    const [categorySearch, setCategorySearch] = useState(defaultCategorySearch)
    const [categoriesState, setCategoriesState] = useState(categories)
    const [newCategorySearch, setNewCategorySearch] = useState(false)
    const [newCategoryText, setNewCategoryText] = useState(defaultNewCategoryText)

    // const [categorySearch, setCategorySearch] = useState(defaultCategorySearch)

    // useEffect(() => {
    //     axios.get('http://www.expertstolearnfrom.com/api/categories')
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //   }, []);

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

    const handleNewCategoryChanges = (evt) => {
        const { name, value } = evt.target;
        setNewCategoryText({ ...categorySearch, [name]: value });
    }

    const selectCategory = (evt) => {
        console.log(evt.target.id)
        saveCategory(evt.target.id)
        nextStep()
    }

    const submitNewCategory = (evt) => {
        console.log(evt.target.id)
        saveCategory(newCategoryText.newCategory)
        nextStep()
    }

    return(
        <div className='select-category-container'>
            <h2>Add a new Expert!</h2>
            <div className='select-category-form'>
                <div className='select-category-search-form'>
                    <form onSubmit={search}>
                        <p>Which category would you like to add a new Expert in? * </p>
                        <input value={categorySearch.category} onChange={handleSearchChanges} placeholder='Search category' name="category" type='text'></input>
                        <button className='search-button'><FontAwesomeIcon  icon="search" />   Search</button>
                    </form>
                    
                    <div className='category-list'>
                        {
                            categoriesState.map((item) => (
                                    <p className="category" id={item} onClick={selectCategory}>{item}</p>
                            ))
                        }
                    </div>
                    
                </div>



                    <div className='new-category-wrapper'>
                        <p onClick={() => setNewCategorySearch(!newCategorySearch)}>Click here if you would like to add a new category</p>
                        
                        { 
                            newCategorySearch ? <form onSubmit={submitNewCategory}>
                                <input value={newCategoryText.newCategory} onChange={handleNewCategoryChanges} placeholder="Enter new category" name="newCategory" type="text"/>
                                <button>Add new Category</button>
                            </form> : null 
                        }
                    </div>
            </div>
        </div>
    )
}


export default SelectCategoryForm;