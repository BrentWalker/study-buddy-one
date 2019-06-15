import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <div className="nav-item"><span className="nav-logo">Logo Here</span></div>
                <div className="nav-item"><Link to="/home">Home</Link></div>
                <div className="nav-item"><Link to="/user">User</Link></div>
                <div className="nav-item"><Link to="/technology">Technology</Link></div>
                <div className="nav-item"><Link to="/category">Category</Link></div>
                <div className="nav-item"><Link to="/userslist">All Users</Link></div>
            </div>
        )
    }

}
export default Nav