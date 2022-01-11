import React, {Fragment, useState} from "react";
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'
import cardService from "../services/cards";

const AddCardModal = ({ 
  setShowAlert,
  setToastMessage,
  show,
  setShow,
  id,
  setUpdateCardData 
}) => {  
  const [cardData, setCardData] = useState({
    type:'',
    number:'',
    securityCode:'',
    expirationDate:'',
    monthlyLimit:''
  })

  const handleClose = () => setShow(false);  
  const handleChange= (event) => {
    const value = event.target.value
    const name = event.target.name;
    setCardData({...cardData, [name] :value});  
  }

  const handleSubmit = async () => {
    if (!cardData.type || !cardData.number || !cardData.securityCode || !cardData.expirationDate || !cardData.monthlyLimit ){
      setShowAlert(true)
      setToastMessage('fill All the fields')
      return 
    } 
    try {
      const createCard = await cardService.createCards({ ...cardData, childId :id });
      if(createCard.status === 200){
        setUpdateCardData("update")
        setShowAlert(true)
        setToastMessage('Card added successfully')
      }
      else {
        setShowAlert(true)
        setToastMessage('Somethig went Wrong in Create Please Try Again')
      }
      
    } catch (error) {
      setShowAlert(true)
      setToastMessage('Somethig went Wrong in Create Please Try Again')
    }
      handleClose()
  }

  return (
    <Fragment>  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Card for Child</Modal.Title>
        </Modal.Header>
        <Form className="child-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
               Type
            </Form.Label>
          <Col sm={10}>
            <Form.Control name="type"
              onChange={handleChange.bind(this)}
              type="text"
              placeholder="Type"
              required 
            />
           </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" >
              <Form.Label column sm={2}>
                 Number
              </Form.Label>
            <Col sm={10}>
              <Form.Control
               name="number"
               onChange={handleChange.bind(this)}
               type="text"
               placeholder="Number"
              />
            </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={2}>
                  Security Code
                </Form.Label>
                <Col sm={10}>
                  <Form.Control 
                    name="securityCode"
                    onChange={handleChange.bind(this)}
                    type="text"
                    placeholder="Security Code"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={2}>
                  Expiration Date
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                   name="expirationDate"
                   onChange={handleChange.bind(this)}
                   type="text"
                   placeholder="Expiration Date"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={2}>
                  Monthly Limit
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                   name="monthlyLimit"
                   onChange = {handleChange.bind(this)}
                   type="number"
                   placeholder="Monthly Limit"
                  />
                </Col>
              </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            Add Card
            </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
  
export default AddCardModal