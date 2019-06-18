import React, { Component } from 'react';
import axios from 'axios';

class NewCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.state = {
            _id: null,
          title: ""
        };
      }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    componentDidMount() {
        if (this.props.category) {
            const { _id, title } = this.props.category
            this.setState({
                _id,
                title
            })
        }
        console.log(this.props.category)
    }

    render() {
        return <div style={{ marginTop: 15 }}>
            <h3>Add New Category</h3>
            <form onSubmit={e => this.props.onSubmit(e, this.state)}>
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
            <button onClick={this.props.onClose}>close</button>
            </div>
    }
}

const Category = ({category, onClose, onEdit}) => {
    return <div>
        <span>{category.title}</span>
        <button onClick={() => onEdit(category)}>edit</button>
    </div>
}

class CategoryList extends Component {
    state = {
        error: '',
        edit: false,
        categories: []
    }

    onSave = (e, category) => {
        e.preventDefault();
        const { _id, title } = category; 
        console.log(`Category:`, _id, title)
        axios
            .post(`http://localhost:4000/categories/${_id}`, {title})
            .then(this.fetchCategories)
            .catch(err => {
                this.setState({
                    edit: { _id: -1},
                    error: err.message
                });
            });
    }

    onSubmit = (e, category) => {
        e.preventDefault();
        const { _id, title } = category;
        const newCategory = {title};
        axios
            .post(`http://localhost:4000/categories`, newCategory)
            .then(this.fetchCategories)
            .catch(err => {
                this.setState({
                    newCategory: false,
                    edit: { _id: -1},
                    error: err.message
                });
            });
    }

    componentDidMount(){
        this.fetchCategories();
    }

    openEdit = async () => {
        try {
            this.setState({editCategories: true})
        }
        catch (err) {
            console.log(err)
        }
    }

    closeEdit = async () => {
        try {
            this.setState({editCategories: false})
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteCategory = async (category) => {
        const { _id } = category;
        try {
            axios
            .delete(`http://localhost:4000/categories/${_id}`)
            .then(this.fetchCategories)
            .catch(err => {
                this.setState({
                    edit: { _id: -1},
                    error: err.message
                });
            });
            
        }
        catch (err) {
            console.log(err)
        }
    }

    editCategory = async (category) => {
        try {
            this.setState({edit: category})
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    closeCategory = async () => {
        this.setState({
            edit: { _id: -1},
            newCategory: false,
            selectedCategory: ''
        },
        () => {
            console.log("Category Closed")
        })
    }

    showCategory = async (category) => {
        try {
            this.setState({selectedCategory: category});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    newCategory = async () => {
        try {
            this.setState({newCategory: true});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:4000/categories');
            this.setState({
                newCategory: false,
                edit: { _id: -1 },
                categories: res.data});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h3>Categories {this.state.editCategories ? <button onClick={this.closeEdit}><span>done</span></button> : <button onClick={this.openEdit}><span>edit</span></button>}<button onClick={this.newCategory}>+</button></h3>
                {this.state.categories.map(category => {
                    console.log(category)
                    const { _id, title } = category;
                    if (!!_id) {
                        return (
                            <div key={_id}>
                                {this.state.edit._id === _id
                                    ? <NewCategory category={category} onClose={this.closeCategory} onSubmit={this.onSave} /> 
                                    : <Category category={category} onClose={this.closeCategory} onEdit={this.editCategory} />}
                                {this.state.editCategories ? <button onClick={() => this.deleteCategory(category)}><span>delete</span></button> : null}
                            </div>
                        )
                    } else {
                        return (
                            <div>{title}</div>
                        )
                    }
                })}
                {this.state.newCategory ? <NewCategory onSubmit={this.onSubmit} onClose={this.closeCategory} /> : null}
            </div>
        );
    }
}

export default CategoryList;