import React, { Component } from 'react'

const Login = React.lazy(()=>import('./components/Login/Login'))
const Users = React.lazy(()=>import('./components/views/Users'))
const CreateUser = React.lazy(()=>import('./components/CRUD/CreateUser'))
const CreatePackages = React.lazy(()=>import('./components/CRUD/CreatePackages'))
const EditUser = React.lazy(() => import('./components/CRUD/EditUser'))

const Routes = [
    // { path: '/login', exact: true, name: 'Login', component : Login},
    { path: '/users', exact: true, name: 'Users', component : Users},
    { path: '/create', exact: true, name: 'CreateUser', component : CreateUser},
    { path: '/edit', exact: true, name: 'EditUser', component : EditUser},
    {path: '/packages', exact: true, name: 'CreatePackage', component: CreatePackages},
]

export default Routes