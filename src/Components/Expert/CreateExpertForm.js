import React, { Component } from 'react';
import SelectCategoryForm from './SelectCategoryForm'
import ExpertDetailsForm from './ExpertDetailsForm'


export class CreateExpertForm extends Component {

  state = {
    step: 1,
    name: '',
    descriptions: {
      description: '',
      rating: 1
    },
    twitterLink: '',
    youtubeChannel: '',
    blog: '',
    category: '',
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
  };

  saveCategory = (payload) => {
    this.setState({...this.state, category: payload})
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
export default CreateExpertForm;