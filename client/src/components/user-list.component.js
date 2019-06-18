import React, { Component } from 'react';
import axios from 'axios';

class NewUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);

        this.state = {
            _id: null,
          name: "",
          category: "",
          technology: ""
        };
      }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeTechnology(e) {
        this.setState({
            technology: e.target.value
        });
    }

    searchBing() {
        console.log("SearchBING")
    }

    async componentDidMount() {
        if (this.props.user) {
            const technologies = await axios.get('http://localhost:4000/technologies');
            const categories = await axios.get('http://localhost:4000/categories');
            const { _id, name, category, technology } = this.props.user
            this.setState({
                _id,
                name,
                category,
                technology,
                technologies: technologies.data,
                categories: categories.data
            })
        }
        console.log(this.props.user)
    }

    render() {
        const language = /*this.state.technologies ? this.state.technologies.reduce((total, technology) => {
            console.log("TECHNOLOGY", technology);
            if (technology._id === this.state.technology) {
                return technology.language;
            }
          }) : */"Javascript"

        const title = /*this.state.categories ? this.state.categories.reduce((total, technology) => {
            console.log("TECHNOLOGY", technology);
            if (technology._id === this.state.technology) {
                return technology.language;
            }
          }) : */"Functions"

        return <div style={{ marginTop: 15 }}>
            <h3>Add New User</h3>
            <form onSubmit={e => this.props.onSubmit(e, this.state)}>
                <div className="form-group">
                <label>Name: </label>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                />
                <label>Technology and Category: </label>
                <span>{`${language} ${title}`}</span><button onClick={() => this.props.onSearch(encodeURIComponent(`${language} ${title}`))}>search bing</button>
                </div>
                <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary" />
                </div>
            </form>
            <button onClick={this.props.onClose}>close</button>
            </div>
    }
}

const User = ({user, onClose, onEdit}) => {
    return <div>
        <span>{user.name}</span>
        <button onClick={() => onEdit(user)}>edit</button>
    </div>
}

class UserList extends Component {
    state = {
        error: '',
        edit: false,
        users: [],
        results: []
    }

    onSearch = (entry) => {
        const obj = {
            headers: {
                "Ocp-Apim-Subscription-Key":"655671361d2c426396594b6acdd7b198"
            }
        }
        axios
            .get(`https://api.cognitive.microsoft.com/bing/v7.0/search?q=${entry}`, obj)
            .then(res => {
                // console.log(res.data.videos.value)
                this.setState({
                    results: res.data.videos.value
                })
            })
    }

    onSave = (e, user) => {
        e.preventDefault();
        const { _id, name } = user; 
        console.log(`User:`, _id, name)
        axios
            .post(`http://localhost:4000/users/${_id}`, {name})
            .then(this.fetchUsers)
            .catch(err => {
                this.setState({
                    edit: { _id: -1},
                    error: err.message
                });
            });
    }

    onSubmit = (e, user) => {
        e.preventDefault();
        const { name } = user;
        const newUser = {name};
        axios
            .post(`http://localhost:4000/users`, newUser)
            .then(this.fetchUsers)
            .catch(err => {
                this.setState({
                    newUser: false,
                    edit: { _id: -1},
                    error: err.message
                });
            });
    }

    componentDidMount(){
        this.fetchUsers();
    }

    openEdit = async () => {
        try {
            this.setState({editUsers: true})
        }
        catch (err) {
            console.log(err)
        }
    }

    closeEdit = async () => {
        try {
            this.setState({editUsers: false})
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteUser = async (user) => {
        const { _id } = user;
        try {
            axios
            .delete(`http://localhost:4000/users/${_id}`)
            .then(this.fetchUsers)
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

    editUser = async (user) => {
        try {
            this.setState({edit: user})
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    closeUser = async () => {
        this.setState({
            edit: { _id: -1},
            newUser: false,
            selectedUser: ''
        },
        () => {
            console.log("User Closed")
        })
    }

    showUser = async (user) => {
        try {
            this.setState({selectedUser: user});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    newUser = async () => {
        try {
            this.setState({newUser: true});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:4000/users');
            this.setState({
                newUser: false,
                edit: { _id: -1 },
                users: res.data});
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
                <h3>Users {this.state.editUsers ? <button onClick={this.closeEdit}><span>done</span></button> : <button onClick={this.openEdit}><span>edit</span></button>}<button onClick={this.newUser}>+</button></h3>
                {this.state.users.map(user => {
                    console.log(user)
                    const { _id, name } = user;
                    if (!!_id) {
                        return (
                            <div key={_id}>
                                {this.state.edit._id === _id
                                    ? <NewUser user={user} onSearch={this.onSearch} onClose={this.closeUser} onSubmit={this.onSave} /> 
                                    : <User user={user} onClose={this.closeUser} onEdit={this.editUser} />}
                                {this.state.editUsers ? <button onClick={() => this.deleteUser(user)}><span>delete</span></button> : null}
                            </div>
                        )
                    } else {
                        return (
                            <div>{name}</div>
                        )
                    }
                })}
                {this.state.newUser ? <NewUser onSubmit={this.onSubmit} onClose={this.closeUser} /> : null}
                {this.state.results ? this.state.results.map(result => <div><a href={result.contentUrl} target="_blank" ><img src={result.thumbnailUrl} /><br /><span>{result.name}</span></a></div>) : null}
            </div>
        );
    }
}

export default UserList;