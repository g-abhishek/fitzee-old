//------------ not in use
import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom';
const axios = require('axios');

const { filter } = React.lazy(()=> import('/src/js/commonJs'))

// import { filter } from './src/js/commonJs'

class UserTable extends Component{
    constructor(){
        super();
        this.state = {
            users : []           
        }
    }

    componentDidMount(){

        axios.get('http://localhost:3003/user').then(result=>{
            console.log(result);
        this.setState({
                users : result.data
            });
        }).catch(error=>{
            console.log(error);
        });

        
    }


    render(){

        const activeDot = (       
            <p className="activeDot text-center mb-0">&#9679;</p>       
        )
        const inActiveDot = (       
            <p className="inActiveDot text-center mb-0">&#9679;</p>       
        )

        return (
            <div className="users mt-3 animated fadeIn">
                <div className="search-input w-25 float-right mb-2">
                    <input className="form-control" id="myInput" type="text" placeholder="Search.." />
                </div>                
                <br/>
                <table className="table">
                    <thead>                        
                    <tr>
                        <th>Sr no.</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Package Period</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody id="myTable">
                        {this.state.users.map((user, index) => {
                            return ( <tr>
                                <td>{index+1}</td>
                                <td>{user.full_name}</td>
                                <td>{user.mobile}</td>
                                <td>{user.package_period}</td>
                                <td>{user.status == "Active" ? activeDot : inActiveDot}</td>
                                <td><Link to={"/edit/"+user._id} >edit</Link></td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserTable;