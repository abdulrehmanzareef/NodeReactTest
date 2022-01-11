import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import ChildModal from '../components/ChildModal';
import childService from '../services/children';
import ConfirmBox from '../components/ConfirmBox';
import { useHistory } from "react-router-dom";
import ToastAlert from '../components/Toast'


const ChildScreen=()=>{
  const history = useHistory()
  const [show, setShow] = useState(false);
  const [editChildrenData, setEditChildrenData] = useState(null);
  const [updateData, setUpdateData]  = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
    
  useEffect(()=>{
    const getChildren = async () => {
      const getChildren = await childService.getChildren();
      if (getChildren.status === 200) {
        setChildrenData(getChildren.data.children);
        setUpdateData(null);
      }
    }
    getChildren();

  }, [updateData])

  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [type, setType] = useState(null)
  const [id, setId] = useState(null)
  const [childrenData, setChildrenData] = useState(null)

  const handleDelete = (id) => {
    setId(id)
    setType("children")
    setShowConfirmBox(true)   
  }

  const modalHandle = async (value, childrenId)=>{
    if(value==="add"){
      setType("add")
      setShow(true)
    }

    if(value==="edit"){
      const getChild = await childService.getChild(childrenId)
      setEditChildrenData(getChild.data.children)
      setId(childrenId)
      setType("edit")
      setShow(true)
    }      

  }
  const viewCard = (id) => {
    history.push(`/child/${id}/cards`)
  }
  return(
    <div className="child-card">
      <ToastAlert
       show={showAlert}
       setShow={setShowAlert}
       toastMessage={toastMessage}
      />
      <h1 className="text-center">Children</h1>
      <Button
       className="add-child-button"
       onClick={()=> modalHandle("add")}
      >
        Add Child
      </Button>
      {show && 
      <ChildModal
       setShowAlert={setShowAlert}
       setToastMessage={setToastMessage}
       show={show}
       setShow={setShow}
       type={type}
       id={id}
       setUpdateData={setUpdateData}
       editChildrenData={editChildrenData}
      />
      }
      <ConfirmBox
        show={showConfirmBox}
        setUpdateData={setUpdateData}
        setShow={setShowConfirmBox}
        type={type}
        id={id}
      />
      <div className="container container-table">
        <div className="row">
          <div className="col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>id</th>
                    <th style={{width:"500px"}}>Name</th>
                    <th>Age</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                  childrenData ? 
                    childrenData.map((value)=>{
                      return(
                        <tr>
                          <th scope="row">{value.id}</th>
                          <td>{value.name}</td>
                          <td>{value.age}</td>
                          <td>
                            <button
                              onClick={()=> viewCard(value.id)}
                              type="button"
                              className="btn-action btn btn-warning"
                            >
                              Cards
                            </button>
                            <button
                             onClick={()=> modalHandle("edit", value.id)}
                             type="button"
                             className="btn-action btn btn-primary"
                            >
                              Edit Child
                            </button>
                            <button
                              onClick={()=> handleDelete(value.id)} 
                              className="btn-action btn btn-danger"
                              >
                              Delete Child
                            </button>
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

export default ChildScreen;