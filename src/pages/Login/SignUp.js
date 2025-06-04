import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import regAction from "../../actions/regAction";
import Login from "./Login";
import "./Login.css";
import axios from "axios";
import swal from "sweetalert";

// Reusable input component for the sign-up form
const SignUpInputFields = (props) => {
  return (
    <div className="sign-up-wrapper">
      <div className="col m12">
        <div className="input-field" id="email">
          <div className="form-label">Email</div>
          <input type="text" placeholder="Email" onChange={props.changeEmail} />
        </div>
      </div>
      <div className="col m12">
        <div className="input-field" id="password">
          <div className="form-label">Password</div>
          <input
            type="password"
            placeholder="Password"
            onChange={props.changePassword}
          />
        </div>
      </div>
      <div className="col m12">
        <button className="btn red accent-2" type="submit">
          Sign Up!
        </button>
      </div>
    </div>
  );
};

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      lowerPartOfForm: null,
    };
  }

  componentDidMount() {
    // set initial state for lower part of form
    this.setState({
      lowerPartOfForm: (
        <button
          type="button"
          onClick={this.showInputs}
          className="sign-up-button"
        >
          Sign up with email
        </button>
      ),
    });
  }

  changeEmail = (e) => this.setState({ email: e.target.value });
  changePassword = (e) => this.setState({ password: e.target.value });

  showInputs = () => {
    this.setState({
      lowerPartOfForm: (
        <SignUpInputFields
          changeEmail={this.changeEmail}
          changePassword={this.changePassword}
        />
      ),
    });
  };

  submitLogin = async (e) => {
    e.preventDefault();
    const url = `${window.apiHost}/users/signup`;
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await axios.post(url, data);
      const { msg, token } = response.data;

      if (msg === "userExists") {
        swal({
          title: "User already exists",
          text: "Try logging in instead.",
          icon: "error",
        });
      } else if (msg === "invalidData") {
        swal({
          title: "Invalid email/password",
          text: "Please enter a valid email and password.",
          icon: "error",
        });
      } else if (msg === "userAdded") {
        swal({
          title: "Success!",
          text: "Your account has been created.",
          icon: "success",
        });
        // Here we call the Register Action (rejAction) to update out Auth reducer
        this.props.regAction(response.data);
        // Optional: send token to server or store in localStorage
      }
    } catch (err) {
      console.error("Signup error:", err);
      swal({
        title: "Server error",
        text: "Please try again later.",
        icon: "error",
      });
    }
  };

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <button type="button" className="facebook-login">
            Connect With Facebook
          </button>
          <button type="button" className="google-login">
            Connect With Google
          </button>
          <div className="login-or center">
            <span>or</span>
            <div className="or-divider"></div>
          </div>
          {this.state.lowerPartOfForm}
          <div className="divider"></div>
          <div>
            Already have an account?{" "}
            <span
              className="pointer"
              onClick={() => {
                this.props.openModal("open", <Login />);
              }}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    );
  }
}

// mapStateToProps
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

// mapDispatchToProps Function
function mapDispatchToProps(dispatcher) {
  return bindActionCreators(
    {
      openModal,
      regAction,
    },
    dispatcher
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
