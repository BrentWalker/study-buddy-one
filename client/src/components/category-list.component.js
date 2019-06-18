import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NewCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.state = {
            id: null,
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
            const { id, title } = this.props.category
            this.setState({
                id,
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
        categories: [
            {
                "id": 7,
                "title": "Functions",
            },
            {
                "id": 6,
                "title": "RegEx",
            },
            {
                "id": 1,
                "title": "Methods",
            },
            {
                "id": 3,
                "title": "Burgers",
            },
            {
                "id": 2,
                "title": "Fries",
            }
        ]
    }

    onSubmit = (e, category) => {
        e.preventDefault();
        //console log when submitted
        console.log(`Category Form Submitted`);
        console.log(`Title: ${category}`);
        const { id, title } = category;

        if (id) {
            console.log('UPDATE TITLE')
            const updatedCategory = {title};
            console.log('Updated Category:', id, updatedCategory);
        } else {
            console.log("CREATE TITLE")
            const newCategory = {title};
        
            // let result;
            console.log(`Category:`, newCategory)
            axios
                .post("http://localhost:8000/api/v1/categories/", newCategory)
                .then(res => {
                    this.setState({
                            edit: null,
                            categories: res.data
                        },
                        () => console.log(res)
                    );
                })
                .catch(err => {
                    this.setState({
                        edit: null,
                        // error: err.message, 
                        categories: [ ...this.state.categories, { id: 42, title } ]
                    },() => {debugger});
                });
        }

    }

    componentDidMount(){
        this.fetchCategories();
    }

    openEdit = async (category) => {
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
        try {
            // axios.delete
            this.fetchCategories();
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
            edit: false,
            newCategory: false,
            selectedCategory: ''
        },
        () => {
            console.log("Category Closed")
        })
    }

    saveCategory = async (category) => {
        const data = {
            title: category.title
        }
        console.log("save this new category", data)
        try {
            const res = await axios.post('/api/vi//categories', {
                data
            });
            this.setState({});
            this.setState({
                edit: '',
                categories: res.data
            },
            () => {
                console.log("Category Saved")
            })
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
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
            const res = await axios.get('/api/v1//categories');
            this.setState({categories: res.data});
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
        // if (this.state.selectedCategory) {
        //     return this.state.edit ? <NewCategory category={this.state.selectedCategory} onClose={this.closeCategory} onSubmit={this.saveCategory} /> : <Category category={this.state.selectedCategory} onClose={this.closeCategory} onEdit={this.editCategory} />
        // }
        return (
            <div>
                <h3>Categories {this.state.editCategories ? <button onClick={this.closeEdit}><span>done</span></button> : <button onClick={this.openEdit}><span>edit</span></button>}<button onClick={this.newCategory}>+</button></h3>
                {this.state.categories.map(category => {
                    const { id, title } = category;
                    if (id) {
                            return (
                                <div key={id}>
                                    {this.state.edit.id === id
                                        ? <NewCategory category={category}onClose={this.closeCategory} onSubmit={this.saveCategory} /> 
                                        : <Category category={category} onClose={this.closeCategory} onEdit={this.editCategory} />}
                                        {/* <Link onClick={() => this.showCategory(category)}>{category.title}</Link> */}
                                    {this.state.editCategories ? <button onClick={() => this.deleteCategory(id)}><span>delete</span></button> : null}
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