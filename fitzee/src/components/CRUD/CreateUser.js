import React, { Component } from 'react';
import Axios from 'axios';
import $ from 'jquery'

class CreateUser extends Component{
    constructor(props){
        super(props);
        this.state={
            full_name : '',
            gender: 'Male',
            mobile: '',
            package_name : 'General',
            package_description : '',
            package_validity: '',
            package_amount: '',
            package_duration: '',
            total_amount: '',
            given_amount: '',
            pending_amount: '',
            package_start_date: '',
            package_end_date: '',
            payment_type : 'Cash',
            trainer_name: '',
            formErrors: {
                full_name_error : '',
                mobile_error: '',
                package_name : '',
                package_description : '',
                package_validity_error : '',
                package_amount : '',
                total_amount: '',
                given_amount_error: '',
                pending_amount_error: '',
                payment_type_error : '',
                package_start_date_error: '',
                package_end_date_error : '',
                trainer_name_error : '',
            },
            allpackages: []
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:3003/package').then(res => {
            console.log(res)
            this.setState({
                allpackages: res.data.packages
            })
        }).catch(error => {
            console.log(error)
        })
    }
    

    onChange=(e)=>{
        console.log("onChange")

        this.setState({
            [e.target.name] : e.target.value
        })
        
        // debugger;
        
    }
    onSelectedOption =(e)=>{
        this.setState({
            package_amount : parseInt(e.target.value),
            package_name : e.target.options[e.target.selectedIndex].text,
            package_validity: $(e.target.options[e.target.selectedIndex]).attr("data-validity"),
            package_description: $(e.target.options[e.target.selectedIndex]).attr("data-description")
        },this.setEndDate)
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const user = {
            full_name : this.state.full_name,
            gender: this.state.gender,
            mobile: this.state.mobile,
            package_name : this.state.package_name,
            package_description : this.state.package_description,
            package_start_date : this.state.package_start_date,
            package_end_date : this.state.package_end_date,
            package_amount : this.state.package_amount,
            package_duration: this.state.package_duration,
            total_amount: this.state.total_amount,
            given_amount: this.state.given_amount,
            pending_amount: this.state.pending_amount,
            payment_type : this.state.payment_type,
            trainer_name: this.state.trainer_name,
        }
        console.log(user)
        debugger;
        Axios.post('http://localhost:3003/user', user).then(result=>{
            console.log(result)
            console.log(result.data.code)
            if(result.data.code == 11000){
                alert("mobile Number already exists")
            }else{
                // window.location.reload()
            }
            // this.props.history.push('/login');
        }).catch(error=>{
            console.log(error);
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
            package_end_date : packageEndDate,
            package_duration: days
        })
    }


    render(){

        return(
            <div className="mt-4 mb-4">
                <div className="m-3 p-3 div-box-shadow card">
                    <h5 className="text-center font-weight-bold p-3">Admission Form</h5>
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="full_name">Full Name</label>
                            <div class="col-8">
                                <input type="text" className="form-control form-control-sm w-75" placeholder="Full Name" name="full_name" id="ful_name"
                                value={this.state.full_name} onChange={this.onChange} required/>
                                <div id="full_name" className="form-text text-danger">{this.state.formErrors.full_name_error}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="gender">Gender</label>
                            <div class="col-8">
                                <select className="form-control form-control-sm w-75" value={this.state.gender}  name="gender" id="gender" onChange={this.onChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="mobile">Mobile</label>
                            <div class="col-8">
                                <input type="number" className="form-control form-control-sm w-75" placeholder="Mobile" name="mobile" id="mobile"
                                value={this.state.mobile} onChange={this.onChange} required/>
                                <div id="full_name" className="form-text text-danger">{this.state.formErrors.mobile_error}</div>
                            </div>
                        </div>
                    
                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="package_name">Package Name</label>
                            <div class="col-8">
                                <select className="form-control form-control-sm w-75" id="package_name" name="Package Name" onChange={this.onSelectedOption} >
                                    <option data-validity="0" value="0" >General</option>
                                    {this.state.allpackages.map((eachPackage, index)=>{
                                        return (<option data-validity={eachPackage.package_validity} data-description={eachPackage.package_description} value={eachPackage.package_amount}>{eachPackage.package_name} of {eachPackage.package_validity}months</option>);
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="package_validity">Package Description</label>
                            <div class="col-8">
                                <input type="text" className="form-control form-control-sm w-75" placeholder="Description" name="package_description" id="package_description"
                                    value={this.state.package_description} onChange={this.onChange} />
                                <div id="package_validity_error" className="form-text text-danger">{this.state.formErrors.package_description}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="package_validity">Package Validity</label>
                            <div class="col-8">
                                <input type="text" className="form-control form-control-sm w-75" placeholder="Months" name="package_validity" id="package_validity"
                                    value={this.state.package_validity} onChange={this.validityChange} />
                                <div id="package_validity_error" className="form-text text-danger">{this.state.formErrors.package_validity_error}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="package_start_date">Package Start Date</label>
                            <div class="col-8">
                                <input type="date" className="form-control form-control-sm w-75" name="package_start_date" id="package_start_date"
                                    value={this.state.package_start_date} onChange={this.dateChange} required/>
                                <div id="full_name" className="form-text text-danger">{this.state.formErrors.package_start_date_error}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="package_end_date">Package End Date</label>
                            <div class="col-8">
                                <input type="date" className="form-control form-control-sm w-75" name="package_end_date" id="package_end_date"
                                    value={this.state.package_end_date} onChange={this.onChange} required/>
                                <div id="full_name" className="form-text text-danger">{this.state.formErrors.package_end_date_error}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="package_amount">Package Amount</label>
                            <div class="col-8">
                                <input type="number" className="form-control form-control-sm w-75" placeholder="Package Amount" id="package_amount" name="package_amount" 
                                value={this.state.package_amount} onChange={this.onChange} />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="total_amount">Total Amount</label>
                            <div class="col-8">
                                <input type="number" className="form-control form-control-sm w-75" placeholder="Total Amount" id="total_amount" name="total_amount" 
                                value={this.state.total_amount = this.state.total_amount} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="given_amount">Given Amount</label>
                            <div class="col-8">
                                <input type="number" className="form-control form-control-sm w-75" placeholder="Given Amount" id="given_amount" name="given_amount"
                                value={this.state.given_amount} onChange={this.onChange} />
                                <div id="full_name" className="form-text text-danger">{this.state.formErrors.given_amount_error}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="pending_amount">Pending Amount</label>
                            <div class="col-8">
                                <input type="number" className="form-control form-control-sm w-75" placeholder="Pending Amount" id="pending_amount" name="pending_amount" 
                                value={this.state.pending_amount = this.state.total_amount - this.state.given_amount} />
                                <div id="full_name" className="form-text text-danger">{this.state.formErrors.pending_amount_error}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="payment_type">Payment Type</label>
                            <div class="col-8">
                                <select className="form-control form-control-sm w-75" name="payment_type" id="payment_type" onChange={this.onChange}>
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Net Banking">Net Banking</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right" for="trainer_name">Trainer Name</label>
                            <div class="col-8">
                                <input type="number" className="form-control form-control-sm w-75" placeholder="trainer_name" id="trainer_name" name="trainer_name" 
                                onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-from-label text-right"></label>
                            <div class="col-8">
                                <button type="submit" className="btn btn-primary w-75">Submit</button>
                            </div>
                        </div>

                        
                    </form>                
                </div>
            </div>
            
        );
    }
}

export default CreateUser;