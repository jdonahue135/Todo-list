import React from "react";

class LogIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isFocused: null,
        };
    };
    handleFocus(e) {
        this.setState({isFocused: e.target.name})
    }
    handleBlur() {
        this.setState({isFocused: null})
    }
    render() {
        const usernameClassList =
            this.state.isFocused === "username"
                ? "input-overlay input-overlay-focused"
                : "input-overlay";
        const passwordClassList =
            this.state.isFocused === "password"
                ? "input-overlay input-overlay-focused"
                : "input-overlay";
        const buttonClass = this.props.buttonEnabled ? "btn-container" : "btn-container btn-disabled"
        return (
            <div className="log-in-container overlay-form">
                {this.props.warning ? (
                    <div className="warning">
                        The username and password you entered did not match our records.
                        Please double-check and try again.
                    </div>
                    ) : null
                }
                <div className="input-container">
                    <div className={usernameClassList}>
                        Username
                        <input 
                            type="text" 
                            name="username" 
                            className="log-in-input" 
                            onFocus={this.handleFocus.bind(this)} 
                            onBlur={this.handleBlur.bind(this)} 
                            onChange={this.props.onInputChange}
                        />
                    </div>
                    
                    <div className={passwordClassList}>
                        Password
                        <input 
                            type="password" 
                            name="password" 
                            className="log-in-input" 
                            onFocus={this.handleFocus.bind(this)} 
                            onBlur={this.handleBlur.bind(this)} 
                            onChange={this.props.onInputChange}
                        />
                    </div>
                </div>
                <div className={buttonClass} onClick={this.props.buttonEnabled ? this.props.onSubmit : null}>
                    <div className="btn-text">{this.props.signUp ? "Sign up" : "Log in"}</div> 
                </div>
                <div className="cancel" onClick={this.props.handleCancel}>Cancel</div>
            </div>
        )
    }
}

export default LogIn;