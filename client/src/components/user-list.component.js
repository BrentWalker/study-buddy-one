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
            const res = await axios.get('http://localhost:4000/users');
            console.log(res)
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
                <h3>Users</h3>
                {this.state.users.map(user => (
                    <div key={user._id}>
                        <span>{user.name || user._id}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default UserList;