import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserList extends Component {
    state = {
        error: '',
        users: []
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const res = await axios.get('/api/v1//users');
            this.setState({users: res.data});
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
                <h1>All Users dummy</h1>
                {this.state.users.map(user => (
                    <div key={user.id}>
                        <Link to={`/api/v1/users/${user.id}`} >{user.name}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default UserList;