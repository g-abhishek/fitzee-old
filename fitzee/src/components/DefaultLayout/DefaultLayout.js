import React, {Component, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import DefaultSidebar from './DefaultSideBar';
import DefaultMainHeader from './DefaultMainHeader';
import DefaultMainFooter from './DefaultMainFooter';

import Routes from '../../Routes'


// const DefaultSidebar = React.lazy(() => import('./DefaultSideBar'));
// const DefaultMainCenterBar = React.lazy(() => import('./DefaultMainCenterBar'));

class DefaultLayout extends Component{
    

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    
    render(){
        return (   
            <div className="d-flex">       
                <Suspense fallback={this.loading()}>
                    <DefaultSidebar />                    
                </Suspense>

                
                <div class="mainCenterBar" id="mainCenterBar">
                    <DefaultMainHeader />
                    <div className="main">
                        <div className="container-fluid">
                            <Suspense fallback = {this.loading()}>
                                <Switch>
                                    {Routes.map((route, index)=>{
                                        return route.component ? (
                                            <Route 
                                                key={index}
                                                path={route.path}
                                                exact = {route.exact}
                                                name = {route.name}
                                                render = {props => <route.component {...props} />}
                                            />
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/home" />
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                    <DefaultMainFooter />
                </div>
            </div>
        );
    }
}

// ReactDOM.render(
//       <SideNav />,
//     document.getElementById('sidebarLeft')
//   );

export default DefaultLayout;