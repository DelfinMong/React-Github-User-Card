import React from "react";
import "./styles.css";
import axios from "axios";
import Usercard from "./Usercard";
import Followerscard from "./Followercard";

class App extends React.Component {
  state = {
    followersList: [],
    search: [],
    searchTerm: ""
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/DelfinMong")
      .then(res => {
        console.log("API Is Here: ", res);
        this.setState({ login: res.data.login, img: res.data.avatar_url });
      })
      .catch(err => console.log("have an error", err));

    axios
      .get("https://api.github.com/users/DelfinMong/followers")
      .then(res => {
        console.log("Followers API: ", res);
        this.setState({
          followersList: res.data,
          search: res.data
        });
      })
      .catch(err => console.log("have an error", err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("SearchTerm: we have a state change!");
      const follower = this.state.search.filter(people =>
        people.login.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
      this.setState({
        followersList: follower
      });
    }
  }

  handleChange = event => {
    this.setState({
      //	[event.target.name]
      searchTerm: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <Usercard login={this.state.login} img={this.state.img} />

        <form>
          <input
            name="searchTerm"
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
        </form>

        {this.state.followersList.map(item => {
          return <Followerscard login={item.login} img={item.avatar_url} />;
        })}
      </div>
    );
  }
}

export default App;