import React from 'react';
import LoginForm from 'components/forms/LoginForm';
import { Redirect } from 'react-router-dom';
import ApiErrors from 'components/forms/ApiErrors';
import { withAuth } from 'providers/AuthProvider';

class Login extends React.Component {

  state = {
    shouldRedirect: false,
    errors: []
  }

  signIn = (loginData) => {
    this.props.auth.signIn(loginData)
      .then(data => { data.error?this.setState({"errors": [data.error]}) : this.setState({shouldRedirect: true})})
      .catch(errors => {this.setState({"errors":errors})})
  }

  render() {
    const { errors, shouldRedirect } = this.state;
    const { message } = this.props.location.state || '';

    if (shouldRedirect) {
      return <Redirect to={{pathname: '/'}} />
    }

    return (
      <div className="bwm-form">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <h1 className="page-title">Login</h1>
            { message &&
              <div className="alert alert-success">
                {message}
              </div>
            }
            <LoginForm onSubmit={this.signIn} />
            <ApiErrors errors={errors}/>
          </div>
          
        </div>
      </div> 
    )
  }
}

export default withAuth(Login);