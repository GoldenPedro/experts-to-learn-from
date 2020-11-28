import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class ExpertCategoryForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
        <form onSubmit={search}>
        <label>Which category would you like to add a new Expert in? * &nbsp;
            <input value={categorySearch.category} onChange={handleSearchChanges} placeholder='Search category' name="category" type='text' />
        </label>
        <button>Search</button>
    </form>
    );
  }
}

export default ExpertCategoryForm;