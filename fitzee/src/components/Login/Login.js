import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
const axios = require('axios');

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)

        axios.post('http://localhost:3003/login', user).then(result => {
            if(result.data.responseCode == 200){
                localStorage.setItem('fitzeeNekot', result.data.token)
                window.location.href = '/'
            }            
            
        }).catch(error => {
            console.log(error)
        })

    }


    render(){
        return (
            <div className="d-flex align-items-center Bg-Dark" style={{height:"100vh"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card-group">
                                <div className="card Bg-LightDark text-white">
                                    <div className="card-body m-3">                                         
                                        <form onSubmit={this.onSubmit}>
                                            <h2>Login</h2>
                                            <p className="text-muted">Sign In in your account</p>
                                            <div className="form-group">
                                                <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" 
                                                 onChange={this.onChange} required/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" 
                                                onChange={this.onChange} required/>
                                            </div>
                                            <div className="row d-flex">
                                                <div className="col-6">
                                                    <Link class="btn btn-link text-muted" to="forgot" role="button">forgot password?</Link>
                                                </div>
                                                <div className="col-6">
                                                    <button type="submit" className="btn btn-primary float-right">login</button>
                                                </div>                                                
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                                <div className="card d-none d-lg-block bg-primary">
                                    <div className="card-body text-white m-3">
                                         <h2>FittZee</h2>
                                         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled took a galley standard dummy text ever since the 1500s</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Login;