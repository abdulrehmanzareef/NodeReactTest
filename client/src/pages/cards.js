import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import EditCard from '../components/EditCard'
import AddCardModal from '../components/AddCardModal';
import ConfirmBox from '../components/ConfirmBox';
import { useHistory, useParams } from 'react-router-dom'
import cardService from '../services/cards';
import ToastAlert from '../components/Toast'

const ViewCard = () =>{ 
  const { id } = useParams();
  const [showCard, setShowCard] = useState(false);
  const history = useHistory();
  const [cardData, setCardData] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [show, setShow] = useState(false);
  const [updateCardData, setUpdateCardData] = useState(null);
  const [type, setType] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  useEffect(() => {
    const getCards = async () => {
      try {
        const data = await cardService.getCards(id);
        setUpdateCardData(null);
        setCardData(data.data.cards)
      } catch (error) {
        showAlert(true)
        setToastMessage("some thing went wrong in getCards")
      }
      
    }
    getCards();
  },[updateCardData]);

  const editCard = (id) => {
    setCardId(id);
    setShow(true);
  }

  const handleDelete = (id) => {
    setCardId(id);
    setType('card');
    setShowConfirmBox(true);
  }
 
  return(
    <div className="child-card">
      <ToastAlert
       show={showAlert}
       setShow={setShowAlert}
       toastMessage={toastMessage}
      />
      <h1 className="text-center">Cards</h1>
      <Button
       className="back-button"
       onClick={()=> history.push("/children")}
       >
         Back
      </Button>
      <Button
       className="add-child-button"
       onClick={() =>setShowCard(true)}
       type="button"
      >
        Add Card
      </Button>
      <EditCard 
        setToastMessage={setToastMessage}
        setShowAlert={setShowAlert}
        setUpdateCardData={setUpdateCardData}
        show={show}
        setShow={setShow}
        id={cardId}
      />  
      <AddCardModal
       setToastMessage={setToastMessage}
       setShowAlert={setShowAlert}
       setUpdateCardData={setUpdateCardData}
       show={showCard}
       setShow={setShowCard}
       id={id}
      /> 
      <ConfirmBox
       setUpdateCardData={setUpdateCardData}
       show={showConfirmBox}
       setShow={setShowConfirmBox}
       type={type}
       id={cardId}
      />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Type</th>
                        <th>Number</th>
                        <th>Security Code</th>
                        <th>Expiration Date</th>
                        <th>Monthly Limit</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    cardData ?
                    cardData.map((value)=>{
                      return(
                        <tr>
                          <th scope="row">{value.id}</th>
                          <td>{value.type}</td>
                          <td>{value.number}</td>
                          <td>{value.securityCode}</td>
                          <td>{value.expirationDate}</td>
                          <td>{value.monthlyLimit}</td>
                          <td>
                          <button onClick={()=> editCard(value.id)} type="button" className="btn-action btn btn-primary">Edit Card</button>
                          <button  onClick={()=> handleDelete(value.id)} className="btn-action btn btn-danger">Delete Card</button>
                          </td>
                        </tr>
                      )
                    }) 
                   : 
                   ""
                  }
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCard