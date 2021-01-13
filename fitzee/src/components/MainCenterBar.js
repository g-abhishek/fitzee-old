import React, {Component} from 'react';
import TopNav from './TopNav';
import { withRouter } from 'react-router-dom'

class MainCenterBar extends Component{
    render(){
        return (
            <div class="mainCenterBar" id="mainCenterBar">
                <TopNav />
                <div class="root">

                </div>
            </div>  
        );
    }
}

export default withRouter(MainCenterBar);