// import {filterTable} from './common';

import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
const axios = require('axios');


class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:3003/user').then(result => {
            console.log(result);
            this.setState({
                users: result.data
            });
        }).catch(error => {
            console.log(error);
        });



        $(document).ready(function () {
            console.log('yes')
            $("#filterInput").on("keyup", function (){
                console.log('keyup')
                var value = $(this).val().toLowerCase();
                $("#userTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
            });
        });


    }





    render() {

        const activeDot = (
            <p className="activeDot text-center mb-0">&#9679;</p>
        )
        const inActiveDot = (
            <p className="inActiveDot text-center mb-0">&#9679;</p>
        )

        let tableDivision;
        if (this.state.users.length > 0) {
            tableDivision = (
                <tbody id="userTable">
                    {this.state.users.map((user, index) => {
                        
                        return (<tr>
                            <td>{index + 1}</td>
                            <td>{user.full_name}</td>
                            <td>{user.mobile}</td>
                            <td>{user.packages[user.packages.length - 1].package_duration}</td>
                            <td>{user.packages[user.packages.length - 1].package_duration}</td>
                            <td>{user.status == "Active" ? activeDot : inActiveDot}</td>
                            <td><Link to={`/edit?q=${user._id}`}>edit</Link></td>
                        </tr>);
                    })}
                </tbody>
            )
        } else {
            tableDivision = (
                <tbody id="userTable">
                    <td className="text-center mt-2" colSpan="6">
                        <p>Table is empty</p>
                    </td>
                </tbody>
            )
        }


        return (
            <div className="mt-4 mb-4">
                {/* { this.state.users.length > 1 ?  tableDiv : nullUser} */}
                <div className="m-3 p-3 div-box-shadow card">
                    <div className="users animated fadeIn">
                        <div className="float-right">
                            <Link to="/create" className="btn btn-primary">Create User</Link>
                        </div>
                        <div className="search-input w-25 float-left mb-2">
                            <input className="form-control" id="filterInput" type="text" placeholder="Search.." autoComplete="off" />
                        </div>
                        <br />
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th>Sr no.</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Duration</th>
                                    <th>Sessions</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            {tableDivision}
                        </table>
                    </div>
                </div>
                
                
            </div>

        );
    }
}

export default Users;