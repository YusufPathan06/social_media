import React from 'react'
import { Card, Col, Container, Figure, Row } from 'react-bootstrap'
import VideoThumbnail from 'react-video-thumbnail'
import ProfilePhoto from '../../assets/images/profile-photo.png'
import './home.style.css'

function Home() {
    return (
        <Container>
            <header>
                <Row>
                    <Col md="11" />
                    <Col md="1">
                        <Figure className='ml-3'>
                            <Figure.Image
                                width={50}
                                height={50}
                                alt="profile-photo"
                                src={ProfilePhoto}
                            />
                            <Figure.Caption>
                                Adil Alvi
                            </Figure.Caption>
                        </Figure>
                    </Col>
                </Row>
            </header>
            <Row>

                <VideoThumbnail
                    videoUrl="https://res.cloudinary.com/smoke-ngrills/video/upload/v1662306289/20171108_091409_1_vlzrkv.mp4"
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    width={80}
                    height={80}
                />
                {/* <video width="550" height="300" controls >
                    <source src="https://res.cloudinary.com/smoke-ngrills/video/upload/v1662306289/20171108_091409_1_vlzrkv.mp4" type="video/mp4" />
                </video> */}
            </Row>
        </Container>
    )
}

export default Home