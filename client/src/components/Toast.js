import { Toast } from "react-bootstrap"

const ToastAlert=({ show, setShow, toastMessage }) => {
  
  return (
    <div className="delete-alert">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  )
}

export default ToastAlert