import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CategoryList extends Component {
    state = {
        error: '',
        categories: []
    }

    componentDidMount(){
        this.fetchCategories();
    }

    fetchCategories = async () => {
        try {
            const res = await axios.get('/api/v1//categories');
            this.setState({categories: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h3>Categories</h3>
                {this.state.categories.map(category => (
                    <div key={category.id}>
                        <Link to={`/api/v1/categories/${category.id}`} >{category.title}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default CategoryList;