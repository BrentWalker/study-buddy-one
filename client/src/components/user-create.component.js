import React, { Component } from "react";
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLoadAge = this.onChangeAge.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      age: "",
      location: "",  
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }
   
  onSubmit(e) {
    e.preventDefault();

    //console log when submitted
    console.log(`User Form Submitted`);
    console.log(`Name: ${this.state.name}`);
    console.log(`Age: ${this.state.age}`);
    console.log(`Location: ${this.state.location}`);
   

    const newUser = {
      name: this.state.name,
      age: this.state.age,
      location: this.state.location,
    }

    // let result;

    axios.post('http://http://localhost:8000/api/v1/users/', newUser)
    .then(res => {
      this.setState({
        complete: true,
        name: "",
        age: "",
        location: "",
      }, () => console.log(res.data));
    })
    .catch(err => {
      this.setState({
        complete: false,
        name: "",
        age: "",
        location: "",
      });
    });
  }

  renderSuccess = () => {
    switch (this.state.complete) {
      case true:
        return <span>USER CREATED SUCCESSFULLY</span>
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
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">

            <label>Name: </label>
            <input
              type="textr"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />

            <label>Age: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />

            <label>Location: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
            />

          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create New User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
