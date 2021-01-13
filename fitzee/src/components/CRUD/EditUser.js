import React, { Component } from 'react'
import Axios from 'axios'

class EditUser extends Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.getAll('q');
        console.log(urlParams)
        console.log(q)
        this.state = {
            id: q,                  // this.props.match.params.id
            user: [],
            packages: [],
            current_package: [],
            packagesLength: 0,
            payments: [],
            current_payment: [],
            paymentsLenth: 0,
            isDataReturned: false,
            fee_payment_input: '',
            payment_type: 'CASH'
        }

    }



    componentWillMount() {
        Axios.get('http://localhost:3003/user/' + this.state.id).then(res => {
            console.log(res.data[0])
            if (res.data.error) {
                alert('there is response error')
                console.log(res.data.error)
            }
            if (res.data) {
                console.log(res.data[0].packages[0])
                this.setState({
                    user: res.data[0],
                    packages: res.data[0].packages,
                    packagesLength: res.data[0].packages.length,
                    current_package: res.data[0].packages[res.data[0].packages.length - 1],
                    payments: res.data[0].payments,
                    current_fees_history: res.data[0].payments[res.data[0].payments.length - 1].package_fees_history[res.data[0].payments[res.data[0].payments.length - 1].package_fees_history.length - 1],
                    paymentsLength: res.data[0].payments.length,
                    isDataReturned: true
                })

            }
        }).catch(error => {
            alert('there is axios error')
            console.log(error)
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    feePayment = (e) => {
        e.preventDefault();
        const feePaymentSchema = {
            total_amount: this.state.current_fees_history.total_amount,
            given_amount: this.state.current_fees_history.given_amount + parseInt(this.state.fee_payment_input),
            pending_amount: this.state.current_fees_history.pending_amount - this.state.fee_payment_input,
            payment_type:  this.state.payment_type
        }
        // debugger;
        Axios.post('http://localhost:3003/user/feepayment/'+this.state.id, feePaymentSchema).then(res => {
            console.log(res)
            if(res.data.statusCode == 200){
                alert("successfully updated")
                window.location.reload()
                
            }
            
        }).catch(error => {
            alert("axios error while FeePayment")
            console.log(error)
        })
    }


    render() {
        return (
            <div>
                {this.state.isDataReturned ?

                    <div className="mt-4 mb-4">
                        <div className="m-3 p-3 card div-box-shadow">
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th colspan="4" className="text-center"><h5 className="mb-0">{this.state.user.full_name}</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Mobile Number</th>
                                        <td colspan="2">{this.state.user.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Gender</th>
                                        <td colspan="2">{this.state.user.gender}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">DOA</th>
                                        <td colspan="2">{new Date('2020-08-04T11:57:01.317Z').toDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Current Package</th>
                                        <td colspan="2">{this.state.current_package.package_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Package Description</th>
                                        <td colspan="2">{this.state.current_package.package_description}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Total Amount</th>
                                        <td colspan="2">{this.state.current_fees_history.total_amount}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Given Amount</th>
                                        <td colspan="2">{this.state.current_fees_history.given_amount}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-right" colspan="2">Balanced</th>
                                        <td colspan="2" className="text-danger">{this.state.current_fees_history.pending_amount===0?"no balance fee":this.state.current_fees_history.pending_amount}</td>
                                    </tr>
                                    {/* <tr>
                                        <th scope="row" className="text-right" colspan="2">Payment Method</th>
                                        <td colspan="2">{this.state.current_fees_history.payment_type}</td>
                                    </tr> */}

                                </tbody>
                            </table>
                        </div>

                        <div className="m-3 p-3 card div-box-shadow">
                            <h5 className="pb-2">Fees History</h5>
                            <table className="table table-bordered table-sm">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Current Package</th>
                                        <th scope="col">Total Fee</th>
                                        <th scope="col">Given Fee</th>
                                        <th scope="col">Balance Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{this.state.current_package.package_name}</th>
                                        <td>{this.state.current_fees_history.total_amount}</td>
                                        <td>{this.state.current_fees_history.given_amount}</td>
                                        <td className="text-danger">{this.state.current_fees_history.pending_amount}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div >
                                <form onSubmit={this.feePayment} method="post">
                                    <div className="form-row align-items-baseline m-0">
                                        <h6 className="">Fee Payment:</h6>
                                    
                                    <div className="form-group col">
                                        <input type="number" className="form-control form-control form-control-sm" placeholder="Fee Payment" onChange={this.onChange} id="fee_payment_input" name="fee_payment_input"
                                        value={this.state.fee_payment_input}  required/>
                                        <div id="fee_payment_input_error" className="form-text text-danger d-none">fee_payment_input</div>
                                    </div>
                                    <div className="form-group col">
                                        <select className="form-control form-control-sm" name="payment_type" id="payment_type"  onChange={this.onChange}>
                                            <option value="Cash">Cash</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Net Banking">Net Banking</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-sm btn-primary w-100">Pay</button>
                                    </div>
                                    </div>
                                    
                                </form>
                                
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>

                    : <div></div>}
            </div>

        )
    }
}

export default EditUser;