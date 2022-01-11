import React, {Fragment, useState} from "react";
import { Row, Modal, Form, Col, Button } from 'react-bootstrap'
import cardService from "../services/cards";

const EditCard=({
  setShowAlert,
  setToastMessage,
  show,
  setShow,
  id,
  setUpdateCardData
})=> { 

  const [cardData, setCardData] = useState({
      monthlyLimit:'',
  })

  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name;

    if(name === 'monthlyLimit'){
        setCardData({...cardData, monthlyLimit :value})
    }
  }
  const handleSubmit= async ()=>{
    if(!cardData.monthlyLimit){
      setShowAlert(true)
      setToastMessage('Fill the field')
      return 
    }
    try {
      const updateCard = await cardService.updateCards(id, cardData)
      if(updateCard.status === 200){
        setShowAlert(true)
        setToastMessage('Card Updated')
        setUpdateCardData("update")
      }
      else{
        setShowAlert(true)
        setToastMessage('Something Went Wrong in Card Update Please Try Again')
      }
    } catch (error) {
      setShowAlert(true)
      setToastMessage('Something Went Wrong in Card Update Please Try Again')
    }
      
      handleClose()
  }
  return (
    <Fragment>  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Card Data</Modal.Title>
        </Modal.Header>
        <Form  className="child-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Monthly Limit
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="monthlyLimit"
                onChange={handleChange.bind(this)}
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
            Update Card
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
  
export default EditCard