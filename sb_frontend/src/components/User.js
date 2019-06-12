import React, {Component} from 'react';
import axios from 'axios';

class User extends Component {

    state = {
            user: {},
            songs: [],
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.fetchuser(userId)
    }

    fetchUser = async (userId) => {
        try {
            const userResponse = await axios.get(`/api//v1/users/${userId}`)
            this.setState({
                user: userResponse.data,
                songs: userResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.user.photo_url} alt=""/>
                <h1>{this.state.user.name}</h1>
                {this.state.songs.map(song => (
                    <div key={song.id}>
                        <h4>{song.title}</h4>
                        
                    </div>
                ))}
            </div>
        );
    }
}

export default User;