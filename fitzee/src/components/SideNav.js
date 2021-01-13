import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
// import ReactDom from 'react-dom'

class SideNav extends Component{
    
    render(){
        return (
                <div class="sidebarLeft sidebar-show" id="sidebarLeft">
                <div className="brandName">Abhishek</div>
                <ul className="nav flex-column sidebarNav">
                    <li className="nav-item">
                        <Link to="home" className="nav-link">Home</Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link to="users" className="nav-link">Users</Link>
                        
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="link3">Link 3</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="link4">Link 4</a>
                    </li>
                </ul>
                </div>
        );
    }
}

// ReactDOM.render(
//       <SideNav />,
//     document.getElementById('sidebarLeft')
//   );

export default withRouter(SideNav);