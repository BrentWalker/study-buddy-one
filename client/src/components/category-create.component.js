import React, { Component } from "react";
import axios from "axios";

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: ""
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    //console log when submitted
    console.log(`Category Form Submitted`);
    console.log(`Title: ${this.state.title}`);

    const newCategory = {
      title: this.state.title
    };

    // let result;

    axios
      .post("http://localhost:8000/api/v1/categories/", newCategory)
      .then(res => {
        this.setState(
          {
            complete: true,
            title: ""
          },
          () => console.log(res.data)
        );
      })
      .catch(err => {
        this.setState({
          complete: false,
          title: ""
        });
      });
  }

  renderSuccess = () => {
    switch (this.state.complete) {
      case true:
        return <span>CATEGORY ADDED SUCCESSFULLY</span>;
      case false:
        return <span>SOMETHING WENT WRONG</span>;
      case undefined:
        return null;
      default:
    }
  };

  render() {
    return (
      <div style={{ marginTop: 15 }}>
        {this.renderSuccess()}
        <h3>Add New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
