import { Fragment, useState } from "react";
import { Modal, Button } from "react-bootstrap"
import ToastAlert from './Toast'
import cardService from "../services/cards";
import childService from "../services/children";

const ConfirmBox=({ 
  show,
  setShow,
  id,
  type,
  setUpdateData,
  setUpdateCardData
} )=> {
  const [showAlert, setShowAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState(null)
  const handleClose = () => setShow(false);
  const handleDelete = async ()=>{
    if(type === 'card'){
      try {
        const deleteCard= await cardService.deleteCards(id)
        setToastMessage(deleteCard.data.message)
        setUpdateCardData("update")
        setShowAlert(true)
        handleClose()
        
      } catch (error) {
        setToastMessage("Error in card delete")
      }
     
    }
    else
    {   
      try {
        const deleteChildren= await childService.deleteChildren(id)
        if(deleteChildren.status === 200){
        setToastMessage(deleteChildren.data.message)
        setUpdateData("update")
        setShowAlert(true)
        }
      } catch (error) {
        setToastMessage("Error in child delete")
      }
      
      handleClose()
    }
  }
  return(
    <Fragment>
      <ToastAlert
       show={showAlert}
       setShow={setShowAlert}
       toastMessage={toastMessage}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation Box</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are You Sure You Want to Delete ? {id}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
             onClick={()=> handleClose()}
             variant="secondary"
            >
              Close
            </Button>
            <Button
              onClick={()=> handleDelete()}
              variant="danger"
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </Fragment>
  )
}
export default ConfirmBox