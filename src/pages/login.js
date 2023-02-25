import React from 'react'
import Layout from '../components/layout'
import LoginComponent from '../components/loginComponent'
import Seo from '../components/seo'


const Login = () => {
    return (
        <Layout>
            <LoginComponent />
        </Layout>
    )
}


export default Login;

export const Head = () => <Seo title="Вход в личный кабинет" />