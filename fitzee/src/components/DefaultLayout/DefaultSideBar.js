import React, {Component} from 'react'
import {Link} from 'react-router-dom';
// import ReactDom from 'react-dom'

class DefaultSideBar extends Component{

    signOut(e) {
        e.preventDefault()
        localStorage.removeItem('fitzeeNekot')
        window.location.href = '/login'
    }
    
    render(){
        return (
            <div class="sidebarLeft sidebar-show" id="sidebarLeft">
                <div className="brandName">Abhishek</div>
                <ul className="nav flex-column sidebarNav">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" className="nav-link">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create" className="nav-link">Create User</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/packages" className="nav-link">Packages</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={e=>this.signOut(e)} to="/logout" className="nav-link">Logout</Link>
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

export default DefaultSideBar;