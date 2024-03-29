import React, { Component } from 'react';
import SelectCategoryForm from './SelectCategoryForm'
import ExpertDetailsForm from './ExpertDetailsForm'
import { connect } from 'react-redux';
import saveUserInfoReducer from '../../Store/Reducers'
import axios from 'axios'


let useridLocal = window.localStorage.getItem('userid');

export class CreateExpertForm extends Component {

  state = {
    step: 1,
    name: '',
    description: '',
    twitterLink: '',
    youtubeChannel: '',
    blog: '',
    category: '',
  }

  submitData = {
    name: '',
    descriptions: {
        description: '',
        rating: 1
    },
    twitterLinks: {
        twitterLink: '',
        rating: 1
    },
    youtubeChannels: {
        youtubeChannel: '',
        rating: 1
    },
    blogs: {
        blog: '',
        rating: 1
    },
    categories: {
        category: '',
        rating: 1
    },
}

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
    // console.log(useridLocal);
  };

  saveCategory = (payload) => {
    this.setState({...this.state, category: payload})
  }

  submit = (evt) => {
    evt.preventDefault();
    // Packages an easy-to-use payload to put onto state
    const newData = {...this.submitData,
      user: useridLocal,
      name: this.state.name, 
      descriptions: {description: this.state.description, rating: 1},
      twitterLinks: {twitterLink: this.state.twitterLink, rating: 1},
      youtubeChannels: {youtubeChannel: this.state.youtubeChannel, rating: 1},
      blogs: {blog: this.state.blog, rating: 1},
      categories: {category: this.state.category.toLowerCase(), rating: 1}
    }
    console.log(newData)
    // console.log(useridLocal);

    if (this.state.name.length == 0 || this.state.description.length == 0) {
      alert("Please enter a name and description.")
    } else {
      // Axios functionality
      axios.post('https://www.expertstolearnfrom.com/api/NewExpert', newData)
      .then((res) => {
          console.log(res.data);
          window.location.href="/";
      })
      .catch(err => {
          console.log(err);
      })
    }
    
    // Adds new data to state & clears form
    // setSavedFormInfo([...savedFormInfo, newData]);
    // setFormValues(defaultValues);
    // history.push('/');
}

    render() {

          

      const { step } = this.state;
      const { name, description, twitterLink, youtubeChannel, blog, category } = this.state;
      const values = { name, description, twitterLink, youtubeChannel, blog, category };
      
    switch (step) {
        case 1:
          return (
            <SelectCategoryForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            saveCategory={this.saveCategory}
            />
          );
        case 2:
          return (
            <ExpertDetailsForm
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
              submit={this.submit}
            />
          );
        // case 3:
        //   return (
        //     <Confirm
        //       nextStep={this.nextStep}
        //       prevStep={this.prevStep}
        //       values={values}
        //     />
        //   );
        // case 4:
        //   return <Success />;
        default:
          (console.log('This is a multi-step form built with React.'))
      }
    }
}

const mapStateToProps = state => {
  return {
    userinfo: state.saveUserInfoReducer.userinfo
  }
}

export default connect(mapStateToProps, {saveUserInfoReducer})(CreateExpertForm);