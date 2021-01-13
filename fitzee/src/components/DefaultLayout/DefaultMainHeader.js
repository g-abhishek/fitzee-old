import React, {Component} from 'react'
import $ from 'jquery';

class DefaultMainHeader extends Component{

    componentDidMount(){
        $("#sideNavToggle").click(function(e) {
            e.preventDefault();
            $("#sidebarLeft").toggleClass("toggleNav");
        });
    }

    render(){
        return (                     
            <nav className="navbar navbar-expand-lg bg-light sticky-top text-white">
                    <a className="navbar-brand" id="sideNavToggle" href="#">Abhishek</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Disabled</a>
                        </li> */}
                    </ul>
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </nav>            
          );
    }
}

export default DefaultMainHeader;
