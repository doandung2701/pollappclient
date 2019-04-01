import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import {Redirect } from 'react-router-dom'
import { Spin,  } from 'antd';

import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    constructor(props){
        super(props);        
    }
    render() {
        console.log(this.props.login.authenticated);
        console.log(this.props.login.currentUser);
        if(this.props.login.authenticated==true&&this.props.login.currentUser!=null) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.loginUser}{...this.props} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                this.props.onLogin(loginRequest);
            }
        });
    

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.props.login.loading==true}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="Username or Email" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
            </Spin>
        );
    }
}


export default Login;