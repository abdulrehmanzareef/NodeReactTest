import React, {useState}  from 'react'
import {Card, Button, Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'


function Login() {
    const history = useHistory()
    const [loginData, setLoginData]=useState({
        Email:'',
        Password:''
    })
    const handleChange=(event)=>{
        const value=event.target.value
        const name=event.target.name;
        if(name === 'email'){
            setLoginData({...loginData, Email:value})
        }
        if(name ==='password'){
            setLoginData({...loginData, Password:value})
        }

    }

    const ValidateUser=()=>{
        if(!loginData.Email || !loginData.Password){
            alert("fill all the fields")
        }
        else{
            history.push('/children');
        }
    }
  
return (
    <div>
        <Card className="Login-card">
            <Card.Body>
                <Card.Title className="text-center">Login Page</Card.Title>
                <Card.Text>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" onChange={handleChange.bind(this)} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" onChange={handleChange.bind(this)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={ValidateUser} variant="primary" type="submit" className="login-submit-button">
                            Submit
                        </Button>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    )
}

export default Login
