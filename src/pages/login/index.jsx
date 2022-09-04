import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { Card, Form, Button, Row, Container, Col, Alert } from 'react-bootstrap';
// import ProfilePhoto from '../../assets/images/profile-photo.png'
// import Camera from '../../assets/images/cam1.png'
import './login.style.css';
import axios from 'axios';

function Login() {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState();
    const photoUpload = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setProfilePic({
                file,
                imagePreviewUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login) {
            if (!name) {
                toast.error('Please enter a proper name', { autoClose: 1000 })
                return
            }
            if (!profilePic?.imagePreviewUrl) {
                toast.error('Please upload a image', { autoClose: 1000 })
                return;
            }
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Email id entered is invalid', { autoClose: 1000 })
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            toast.error('Password should have minimum eight characters, one letter and one number', { autoClose: 1000 });
            return;
        }
        const bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        if (!login) {
            bodyFormData.append('name', name);
            bodyFormData.append('profilePic', profilePic?.imagePreviewUrl);
        }
        try {
            const result = await axios({
                method: "post",
                url: "client",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            toast.error('Signup error', { autoClose: 3000 })
        }
    }

    return (
        <Container>
            <Row>
                <Col />
                <Col md lg="5">
                    <Card className='card'>
                        <Card.Header as="h3">
                            {login ? 'Login' : 'Register'}
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {!login && (
                                    <>
                                        {profilePic?.imagePreviewUrl && (
                                            <Card.Img
                                                src={profilePic?.imagePreviewUrl}
                                                alt="profilephoto"
                                                variant="top"
                                                className="profile-photo"
                                            />
                                        )}
                                        <Form.Group className="my-4 mx-4">
                                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Enter Name" />
                                        </Form.Group>
                                        <Form.Group className="my-4 mx-4">
                                            <Form.Control required onChange={photoUpload} type="file" placeholder="Upload Profile Photo" />
                                        </Form.Group>
                                    </>
                                )}
                                <Form.Group className="my-4 mx-4" controlId="formBasicEmail">
                                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="my-4 mx-4" controlId="formBasicPassword">
                                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Password" />
                                </Form.Group>
                                <Button onClick={handleSubmit} variant="primary" type="submit">
                                    Submit
                                </Button>
                                <Button onClick={() => setLogin(!login)} className='mx-4' variant="primary">
                                    {login ? 'Register' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col />
            </Row>
        </Container>
    )
}

export default Login