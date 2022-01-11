import React, {useState, useEffect, Fragment} from "react";
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'
import childService from "../services/children";


const ChildModal = ({
  setToastMessage,
  setShowAlert,
  show,
  setShow,
  type,
  id,
  setUpdateData,
  editChildrenData
})=> { 

  const [childData, setChildData]=useState({
      name:'',
      age:''
    }
  );
   
  useEffect(() => {
    if (type === 'edit') {
      const editableData = {
        name:editChildrenData.name,
        age:editChildrenData.age
      }
      setChildData({...editableData})           
    }
  
    if (type === 'add') {
      const editableData = { name: "", age: '' };
      setChildData({...editableData});
    }
  },[type]);

  const handleClose = () => setShow(false);
  const handleChange = (event) => {
    const value=event.target.value;
    const name=event.target.name;
    setChildData({ ...childData, [name]: value });
  }

  const handleSubmit = async () => {
    if(!childData.name || !childData.age) {
      setShowAlert(true);
      setToastMessage('fill All the fields');
      return;
    }

    if (type === 'add') {
      try {
        const createChildren = await childService.createChildren(childData)
        if (createChildren.status === 200) {
          setShowAlert(true)
          setToastMessage('Child Created Successfully');
          setUpdateData('update');
        } else {
          setShowAlert(true);
          setToastMessage('Somethig went Wrong Please Try Again');
        }
      } catch (error){
        setShowAlert(true);
        setToastMessage('Somethig went Wrong Please Try Again');
      }
    }

    if (type === 'edit') {
      try {
        const updateChildren = await childService.updateChildren(id, childData)
        if(updateChildren.status === 200) {
          setShowAlert(true)
          setToastMessage('Child Updated Successfully')
          setUpdateData("update")
        } else {
          setShowAlert(true);
          setToastMessage('Somethig went Wrong in Child Update Please Try Again');
        }
        setUpdateData('update');
      } catch (error) {
        setShowAlert(true);
        setToastMessage('Somethig went Wrong in Child Update Please Try Again');
      }
    }
    handleClose();
  }
  return (
    <Fragment>  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Child</Modal.Title>
        </Modal.Header>
        <Form className="child-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
               Name
            </Form.Label>
            <Col sm={10}>
            <Form.Control
             defaultValue={type === 'edit'? childData.name  : ""}
             name="name"
             onChange={handleChange.bind(this)}
             type="text"
             placeholder="Name"
            />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm={2}>
               Age
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                defaultValue={type === 'edit' ? childData.age  : ""}
                name="age"
                onChange={handleChange.bind(this)}
                type="number"
                placeholder="Age"
              />
            </Col>
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {type === 'edit' ? 'Update Children' : 'Add Child'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
  
 export default ChildModal