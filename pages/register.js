import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/navigation';

export default function Register() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const submitLogin = (event) => {
        event.preventDefault();
        let exists = false
        fetch('https://kronia-coincap-default-rtdb.firebaseio.com/users.json').then(res => res.json()).then(data => {
            
        Object.values(data).forEach(user => {
                let name = user.name
                let userEmail = user.email
                if (name === username || userEmail === email) {
                    exists = true
                }
    })
        if (!exists) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"name": username, "email": email, "password": password})
            };
            fetch('https://kronia-coincap-default-rtdb.firebaseio.com/users.json', requestOptions).then(res => res.json().then(data => {
                setShowModal(true)
                setSuccess(true)
            }))
        } else { 
            setSuccess(false)
            setShowModal(true)}
    })}

    const toLogin = () => {
        router.push('/login')
    }
    
    return (
        <>
        <Container className="justify-content-md-center">
      <Row className="justify-content-md-center">
        <Col md="auto">
            <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Text>Register</Card.Text>
            <Form onSubmit={submitLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Button variant="primary" onClick={toLogin}>
                    Login
                </Button>
            </Form>
        </Card.Body>
    </Card>
        </Col>
        </Row>
        </Container>
        {showModal &&   <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{success ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {success ? <p>User registered succesfully</p> : <p>Username or email already registered</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div> }
    </>
    )
}