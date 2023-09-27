import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../redux/features/auth-slice';

export default function Login() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const auth = useSelector(state => state.auth.value)
    const dispatch = useDispatch()

    const submitLogin = async (event) => {
        event.preventDefault();
        let userData = {}
        await fetch('https://kronia-coincap-default-rtdb.firebaseio.com/users.json').then(res => res.json()).then(data => {
        let correctData = false    
        Object.values(data).forEach(user => {
                let name = user.name
                let userPassword = user.password
                if (name === username || userPassword === password) {
                    correctData = true
                    userData = user
                }
            }
        )
        if(correctData) {
            console.log('userdata', userData)
            dispatch(login({name: userData.name, email: userData.email}))
            router.push('/coincap')
        }

    })}

    const toRegister = () => {
        router.push('/register')
    }
    
    return (
        <>
        <Container className="justify-content-md-center">
      <Row className="justify-content-md-center">
        <Col md="auto">
            <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Text>Login</Card.Text>
            <Form onSubmit={submitLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" onClick={toRegister}>
                    Register
                </Button>
            </Form>
        </Card.Body>
    </Card>
        </Col>
        </Row>
        </Container>
    </>
    )
}