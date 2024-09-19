import React from 'react'
import Card from 'react-bootstrap/Card';
import projImage from '../assets/mediaPlayer.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';



function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card style={{ width: '100%' }} className='shadow border-0 rounded-0' onClick={handleShow}>
        <Card.Img variant="top" src={`${serverUrl}/uploads/${project?.projectImage}`} className='rounded-0' style={{height:'300px'}} />
        <Card.Body>
          <Card.Title className='text-center'>{project?.title}</Card.Title>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
               <img src={`${serverUrl}/uploads/${project?.projectImage}`} alt="no image" width={'100%'} />
            </Col>
            <Col md={6}>
              <h4>Descriptions:</h4>
              <p>{project?.overview}</p>
              <h4 className='mt-3'>Technologies</h4>
              <p>{project?.language}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        <Link to={project.github} target='_blank'><FontAwesomeIcon icon={faGithub} className="fa-2x text-info" /></Link>
        <Link to={project.website} target='_blank'><FontAwesomeIcon icon={faLink} className="fa-2x text-info ms-3" /></Link>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ProjectCard
