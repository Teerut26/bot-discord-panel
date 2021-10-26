import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      data: null,
    };
  }

  componentDidMount() {
    this.getAvatar();
  }

  async getAvatar() {
    let config = {
      method: "get",
      url: "https://discordapp.com/api/v7/users/@me",
      headers: {
        authorization: "Bot " + localStorage.getItem("TOKEN"),
      },
    };
    let res = await axios(config);
    let data = await res.data;
    this.setState({
      avatar: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
    });
    this.setState({ data });
  }

  logOut() {
    this.props.dispatch({
      type: "REMOVE_TOKEN",
    });

    this.props.history.push("/login");
  }

  onBack() {
    this.props.dispatch({ type: "BACK" });
    this.props.dispatch({
      type: "CLEAR_CHANNEL",
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand flex flex-row gap-2 aling-items-center" onClick={() => this.onBack()}>
            <img
              width="30"
              className="rounded-full "
              src={
                this.state.avatar !== null
                  ? this.state.avatar
                  : "https://ui-avatars.com/api/?name=X"
              }
            />
            <div>{this.state.data !== null ? this.state.data.username : ""} Panel</div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
            </ul>
            <form className="d-flex text-light gap-3 align-items-center">
              <div
                onClick={() => this.logOut()}
                className="btn btn-danger btn-sm rounded-0"
              >
                Logout
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect((state) => {
  return state;
})(withRouter(Navbar));
