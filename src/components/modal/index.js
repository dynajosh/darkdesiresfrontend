import React, { useContext, useState } from "react";
import { BASE_URL } from "../../apis";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import './index.css';
import Lottie from "lottie-react";
import Spinner from '../../assets/lotties/spinner.json'
import { ModalStateContext } from "../../context/modalContext";
import { NewItemContext } from "../../context/newItemContext";


const CreatePostModal = () => {
  const {createModalState, setCreateModalState} = useContext(ModalStateContext)
  const {newItem, setNewItem} =useContext(NewItemContext)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const formData = new FormData

  const CreatePostCall = () => {
    setSubmitting(true)
    formData.append('body', body)

    let config = {
        url: BASE_URL + `posts/`,
        method: 'post',
        data:formData,
      }
    axios(config)
    .then(()=>{
        toast.success("Rant listed");
        setNewItem(!newItem)
        setCreateModalState(!createModalState)
        setSubmitting(false)
    })
}


    return(
        <div className="modal-container">
            <div className="close-row">
                <img src ="/images/close.svg" className="pointer" onClick={()=>setCreateModalState(!createModalState)}/>
            </div>
            <div className="main-area">
                <h4 className="create-text">Let out your rant</h4>
                <form>
                  <div>
                      <textarea name="answer" className="modal-text-area" value={body} maxLength={200} onChange={(e)=>{
                        setBody(e.target.value)
                      }}/>
                      {
                        body? (
                            <div className="success-div">{`${200 - body.length}/200`}</div>
                        ) :
                        (
                            <div className="error-div">Please type out your rant</div>
                        )
                      }

                  </div>

                  <div className="bottom-row">
                    {
                        body ? (
                            <button className="modal-button" onClick={(e)=> {
                                e.preventDefault()
                                CreatePostCall()
                            }
                            
                            }>
                                <div className="button-items-row">
                                {
                                    (submitting) ? (
                                        <Lottie animationData={Spinner} loop={true} className="button-icon"/>
                                        ) : (
                                        <img src = '/images/megaphone.png' className="button-icon"/>
                                    )
                                }       
                                Rant
                                </div>
                        </button>
                        ) : (
                            <button className="inactive-modal-button" onClick={(e)=> {
                                e.preventDefault()
                                toast("hdhd")
                            }
                              
                            }>
                          <div className="button-items-row">
                          {
                            (submitting) ? (
                                <Lottie animationData={Spinner} loop={true} className="button-icon"/>
                                ) : (
                                <img src = '/images/megaphone.png' className="button-icon"/>
                            )
                          }       
                          Rant
                          </div>
                      </button>
                        )
                    }
                      
                  </div>
            </form>
            </div>
        </div>
    )
}

export default CreatePostModal;