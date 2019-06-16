import React, { Component } from "react";
import axios from 'axios';

export default class CreateTechnology extends Component {
  constructor(props) {
    super(props);

    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      labguage: "",
    };
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value
    });
 
  }
   
  onSubmit(e) {
    e.preventDefault();

    //console log when submitted
    console.log(`Technology Form Submitted`);
    console.log(`Language: ${this.state.language}`);
    

    const newTechnology = {
      language: this.state.language,
      
    }

    // let result;

    axios.post('http://http://localhost:8000/api/v1/technologies/', newTechnology)
    .then(res => {
      this.setState({
        complete: true,
        language: "",
      }, () => console.log(res.data));
    })
    .catch(err => {
      this.setState({
        complete: false,
        language: "",
      });
    });
  }

  renderSuccess = () => {
    switch (this.state.complete) {
      case true:
        return <span>TECHNOLOGY ADDED SUCCESSFULLY</span>
      case false:
        return <span>SOMETHING WENT WRONG</span>
      case undefined:
        return null
    }
  };

  render() {
    return (
      <div style={{ marginTop: 15 }}>
        {this.renderSuccess()}
        <h3>Technology</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">

            <label>Language: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.language}
              onChange={this.onChangeLanguage}
            />


          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Save"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
