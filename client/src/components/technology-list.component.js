import React, { Component } from 'react';
import axios from 'axios';

class NewTechnology extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);

        this.state = {
            _id: null,
          language: ""
        };
      }

    onChangeTitle(e) {
        this.setState({
            language: e.target.value
        });
    }

    componentDidMount() {
        if (this.props.technology) {
            const { _id, language } = this.props.technology
            this.setState({
                _id,
                language
            })
        }
        console.log(this.props.technology)
    }

    render() {
        return <div style={{ marginTop: 15 }}>
            <h3>Add New Technology</h3>
            <form onSubmit={e => this.props.onSubmit(e, this.state)}>
                <div className="form-group">
                <label>Title: </label>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.language}
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

const Technology = ({technology, onClose, onEdit}) => {
    return <div>
        <span>{technology.language}</span>
        <button onClick={() => onEdit(technology)}>edit</button>
    </div>
}

class TechnologyList extends Component {
    state = {
        error: '',
        edit: false,
        technologies: []
    }

    onSave = (e, technology) => {
        e.preventDefault();
        const { _id, language } = technology; 
        console.log(`Technology:`, _id, language)
        axios
            .post(`http://localhost:4000/technologies/${_id}`, {language})
            .then(this.fetchTechnologies)
            .catch(err => {
                this.setState({
                    edit: { _id: -1},
                    error: err.message
                });
            });
    }

    onSubmit = (e, technology) => {
        e.preventDefault();
        const { _id, language } = technology;
        const newTechnology = {language};
        axios
            .post(`http://localhost:4000/technologies`, newTechnology)
            .then(this.fetchTechnologies)
            .catch(err => {
                this.setState({
                    newTechnology: false,
                    edit: { _id: -1},
                    error: err.message
                });
            });
    }

    componentDidMount(){
        this.fetchTechnologies();
    }

    openEdit = async () => {
        try {
            this.setState({editTechnologies: true})
        }
        catch (err) {
            console.log(err)
        }
    }

    closeEdit = async () => {
        try {
            this.setState({editTechnologies: false})
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteTechnology = async (technology) => {
        const { _id } = technology;
        try {
            axios
            .delete(`http://localhost:4000/technologies/${_id}`)
            .then(this.fetchTechnologies)
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

    editTechnology = async (technology) => {
        try {
            this.setState({edit: technology})
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    closeTechnology = async () => {
        this.setState({
            edit: { _id: -1},
            newTechnology: false,
            selectedTechnology: ''
        },
        () => {
            console.log("Technology Closed")
        })
    }

    showTechnology = async (technology) => {
        try {
            this.setState({selectedTechnology: technology});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    newTechnology = async () => {
        try {
            this.setState({newTechnology: true});
        }
        catch (err) {
            console.log(err)
            // this.setState({error: err.message})
        }
    }

    fetchTechnologies = async () => {
        try {
            const res = await axios.get('http://localhost:4000/technologies');
            this.setState({
                newTechnology: false,
                edit: { _id: -1 },
                technologies: res.data});
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
                <h3>Technologies {this.state.editTechnologies ? <button onClick={this.closeEdit}><span>done</span></button> : <button onClick={this.openEdit}><span>edit</span></button>}<button onClick={this.newTechnology}>+</button></h3>
                {this.state.technologies.map(technology => {
                    console.log(technology)
                    const { _id, language } = technology;
                    if (!!_id) {
                        return (
                            <div key={_id}>
                                {this.state.edit._id === _id
                                    ? <NewTechnology technology={technology} onClose={this.closeTechnology} onSubmit={this.onSave} /> 
                                    : <Technology technology={technology} onClose={this.closeTechnology} onEdit={this.editTechnology} />}
                                {this.state.editTechnologies ? <button onClick={() => this.deleteTechnology(technology)}><span>delete</span></button> : null}
                            </div>
                        )
                    } else {
                        return (
                            <div>{language}</div>
                        )
                    }
                })}
                {this.state.newTechnology ? <NewTechnology onSubmit={this.onSubmit} onClose={this.closeTechnology} /> : null}
            </div>
        );
    }
}

export default TechnologyList;