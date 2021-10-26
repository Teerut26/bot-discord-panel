import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      isToken: false,
      isError: false,
    };
  }

  async checkToken() {
    let config = {
      method: "get",
      url: "https://discordapp.com/api/v9/users/@me",
      headers: {
        Authorization: "Bot " + this.state.token,
      },
    };
    try {
      await axios(config);
      return true;
    } catch (error) {
      this.setState({ isError: true });
      setTimeout(() => {
        this.setState({ isError: false });
      }, 1500);
      return false;
    }
  }

  async setToken() {
    if (this.state.token === null) return;
    let result = await this.checkToken();
    if (!result) return;
    this.props.dispatch({
      type: "SET_TOKEN",
      playload: this.state.token,
    });
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <div
          className="card shadow-lg border-0 rounded-0"
          style={{ width: "22rem" }}
        >
          <div className="card-body border-0 rounded-0">
            <h5 className="card-title font-bold text-lg">Login Token</h5>
            <input
              type="text"
              className="form-control my-3 rounded-0"
              placeholder="Bot Token"
              value={this.state.token === null ? "" : this.state.token}
              onChange={(v) =>
                this.setState({
                  token: v.target.value.length === 0 ? null : v.target.value,
                })
              }
            />
            <div class="d-grid gap-2  mx-auto">
              <btn
                onClick={() => this.setToken()}
                className="btn btn-primary border-0 rounded-0"
              >
                Login
              </btn>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return state;
})(withRouter(Login)) ;
