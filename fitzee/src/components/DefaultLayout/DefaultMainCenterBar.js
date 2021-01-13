import React, {Component} from 'react';

import DefaultMainFooter from './DefaultMainFooter';

const DefaultMainHeader = React.lazy(() => import('./DefaultMainHeader'))

class DefaultMainCenterBar extends Component{

    render(){
        return (
            <div class="mainCenterBar" id="mainCenterBar">
                <DefaultMainHeader />
                
                <DefaultMainFooter />
            </div> 
            );
    }
}

export default DefaultMainCenterBar;
