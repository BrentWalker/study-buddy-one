import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TechnologyList extends Component {
    state = {
        error: '',
        technologies:  [
            {
                "id": 7,
                "language": "Java",
                "category": 2
            },
            {
                "id": 6,
                "language": "python",
                "category": 3
            },
            {
                "id": 1,
                "language": "javascript",
                "category": 3
            }
        ]
    }

    componentDidMount(){
        this.fetchTechnologies();
    }

    fetchTechnologies = async () => {
        try {
            const res = await axios.get('/api/v1//technologies');
            this.setState({technologies: res.data});
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
                <h3>Technologies</h3>
                {this.state.technologies.map(technology => (
                    <div key={technology.id}>
                        <Link to={`/api/v1/technologies/${technology.id}`} >{technology.language}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default TechnologyList;