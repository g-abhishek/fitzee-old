import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class ForgotPassword extends Component{
    render(){
        return (
            <div className="d-flex align-items-center Bg-Dark" style={{height:"100vh"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card-group">
                                <div className="card Bg-LightDark text-white">
                                    <div className="card-body m-3">                                         
                                        <form>
                                            <h2>ForgotPassword</h2>
                                            <p className="text-muted">Sign In in your account</p>
                                            <div className="form-group">
                                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-75 d-block ml-auto mr-auto">Send Email</button>
                                            <Link class="btn btn-link d-block ml-auto mr-auto text-muted" to="login" role="button">Login</Link>
                                            
                                        </form>
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

export default ForgotPassword;