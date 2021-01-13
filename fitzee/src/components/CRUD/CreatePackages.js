import React, { Component } from 'react'
import Axios from 'axios'
import $ from 'jquery'
import { Link } from 'react-router-dom';

class CreatePackages extends Component {
    constructor() {
        super();
        this.state = {
            package_name: '',
            package_amount: '',
            package_description: '',
            package_validity: '',
            package_errors: {
                package_name_error: '',
                package_amount_error: '',
                package_description_error: '',
                package_validity_error: '',
            },
            packages: []
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const new_package = {
            package_name: this.state.package_name,
            package_amount: this.state.package_amount,
            package_description: this.state.package_description,
            package_validity: this.state.package_validity,
            package_start_date: this.state.package_start_date,
            package_end_date: this.state.package_end_date,
        }

        Axios.post('http://localhost:3003/package', new_package).then(res=>{
            console.log(res)
            if(res.data.statusCode == 200){ 
                window.location.reload()
            }
        }).catch(error => {
            console.log(error)
        })
    }

    dateChange = (e) => {
        this.setState({
            package_start_date: e.target.value,
        }, this.setEndDate)
    }

    validityChange = (e) => {
        this.setState({
            package_validity : e.target.value,
        }, this.setEndDate)
    }

    setEndDate = () => {
        let days = parseInt(this.state.package_validity) * 30;
        let package_end_date = new Date(this.state.package_start_date).setDate(new Date(this.state.package_start_date).getDate() + days);
        // debugger;
        console.log(package_end_date)
        let endDate = new Date(package_end_date);
        console.log(endDate)
        let dd = endDate.getDate();
        let mm = endDate.getMonth() + 1;
        const yyyy = endDate.getFullYear();
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }
        let packageEndDate = `${yyyy}-${mm}-${dd}`;
        console.log(packageEndDate);
        this.setState({
            package_end_date : packageEndDate
        })
    }

    componentDidMount(){

        Axios.get('http://localhost:3003/package').then(res => {
            console.log(res)
            if(res.status == 200){
                this.setState({
                    packages : res.data.packages
                })
            }
        }).catch(error => {
            alert('There is some axios error');
            console.log(error)
        })



        $(document).ready(function () {
            $("#filterInput").on("keyup", function (){
                console.log('keyup')
                var value = $(this).val().toLowerCase();
                $("#packageTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
            });
        });
    }



    render() {
        let tabledivision;
        if(this.state.packages.length > 0){
            tabledivision = (
                <tbody id="packageTable">
                    {this.state.packages.map((pkg, index)=>{
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{pkg.package_name}</td>
                                <td>{pkg.package_amount}</td>
                                <td>{pkg.package_validity + ' Months'}</td>
                                <td>edit</td>
                            </tr>
                        )
                    })}
                </tbody>
            )
        }else{
            tabledivision =(
                <tbody id="packageTable">
                    <tr className="border-bottom">
                        <td colSpan="5"><p className="text-muted text-center font-weight-bold mb-0">No Active Package</p></td>
                    </tr>                    
                </tbody>
            )
        }

        
        return (
            <div className="mt-4 mb-4">
                <div className="m-3 p-3 div-box-shadow card">
                    <div className="users animated fadeIn">
                        <div className="search-input w-25 float-left mb-3">
                            <input type="text" className="form-control" id="filterInput" placeholder="Search..." autoComplete="off"/>
                        </div>
                        <div className="float-right mb-3">
                            <Link to="/packages" className="btn btn-success">New Package</Link>
                        </div>
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th>Sr no.</th>
                                    <th>Package Name</th>
                                    <th>Fess</th>
                                    <th>Validity</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            {tabledivision}
                        </table>
                    </div>
                </div>                

                <div className="m-3 p-3 div-box-shadow card">
                    <div className="">
                        <h5 className="text-center m-3">Create New Package</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="form-group">
                                <label for="package_name">Package Name</label>
                                <input type="text" className="form-control" placeholder="package name" name="package_name" id="package_name"
                                    onChange={this.onChange} />
                                <div id="package_name_error" className="form-text text-danger">{this.state.package_errors.full_name_error}</div>
                            </div>
                            <div className="form-group">
                                <label for="package_amount">Package Amount</label>
                                <input type="number" className="form-control" placeholder="package_amount" name="package_amount" id="package_amount"
                                    onChange={this.onChange} />
                                <div id="package_amount_error" className="form-text text-danger">{this.state.package_errors.package_amount_error}</div>
                            </div>
                            <div className="form-group">
                                <label for="package_description">Package Desciption</label>
                                <input type="text" className="form-control" placeholder="package_description" name="package_description" id="package_description"
                                    onChange={this.onChange} />
                                <div id="package_description_error" className="form-text text-danger">{this.state.package_errors.package_description_error}</div>
                            </div>
                            <div className="form-group">
                                <label for="package_validity">Package Validity</label>
                                <input type="number" className="form-control" placeholder="package_validity" name="package_validity" id="package_validity"
                                    value={this.state.package_validity} onChange={this.onChange} />
                                <div id="package_validity_error" className="form-text text-danger">{this.state.package_errors.package_validity_error}</div>
                            </div>

                            {/* <div className="form-group">
                                <label for="package_start_date">Package Start Date</label>
                                <input type="date" className="form-control" name="package_start_date" id="package_start_date"
                                    value={this.state.package_start_date} onChange={this.dateChange} />
                                <div id="full_name" className="form-text text-danger">{this.state.package_errors.package_start_date_error}</div>
                            </div>
                            <div className="form-group">
                                <label for="package_end_date">Package End Date</label>
                                <input type="date" className="form-control" name="package_end_date" id="package_end_date"
                                    value={this.state.package_end_date} onChange={this.onChange} />
                                <div id="full_name" className="form-text text-danger">{this.state.package_errors.package_end_date_error}</div>
                            </div> */}

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                
                
            </div>

        )
    }
}

export default CreatePackages;
