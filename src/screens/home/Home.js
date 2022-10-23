import { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { PostCard } from "../../components/post-card/PostCard";
import { BASE_URL } from "../../apis";
import './index.css'
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import { ModalStateContext } from "../../context/modalContext";
import { NewItemContext } from "../../context/newItemContext";
import CreatePostModal from "../../components/modal";
import Header from "../../components/header";
import Lottie from "lottie-react";
import Shout from '../../assets/lotties/shout.json'
import Shimmer from "../../components/shimmer";
import IntroSound from "../../assets/sounds/desire.mp3"
import WebFont from 'webfontloader';

WebFont.load({
    custom: {
      families: ['SpeakBold'],
    },
  });


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      padding:'40px',
      border:'none',
      width:'70%',
      height:'auto',
      maxWidth: '1300px'
      
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        overflowY:"scroll"
      },
  };


const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const [nextPage, setNextPage] = useState(null)
    const [previousPage, setPreviousPage] = useState(null)
    const {createModalState, setCreateModalState} = useContext(ModalStateContext)
    const {newItem, setNewItem} =useContext(NewItemContext)


    const audio = useMemo(() => new Audio(IntroSound), []);

    !createModalState && audio.pause()

    


    const getPosts = () => {
        axios.get(
            `${BASE_URL}posts/?page=${pageNumber}&page_size=30`
        )
        .then((res)=>{
            setPosts(res.data.results)
            console.log(res)
            setLoading(false)
            setNextPage(res.data.next)
            setPreviousPage(res.data.previous)

        })
    }

    useEffect(()=>{
        getPosts();
    },[pageNumber, newItem])

    const PaginationRow = () => {
        return(
            <div className="pagination-container">
                <div className="pagination-row">
                    
                    {
                        previousPage && (
                            <div >
                                <button className="pagination-button" onClick={()=>{
                                setPageNumber(pageNumber-1);
                                document.getElementById('desires').scrollIntoView();
                                }}>Previous Page</button>
                            </div>
                        )
                    }
                    {
                        nextPage && ( 
                            <div >
                                <button className="pagination-button" onClick={()=>{
                                setPageNumber(pageNumber+1);
                                document.getElementById('desires').scrollIntoView();
                                }}>Next Page</button>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        )
    }

    return(
        <div>
            <Header />
            <div className="home-wrapper" id="desires">
                <audio src={IntroSound} autoPlay />
                <Modal
                    isOpen={createModalState}
                    onRequestClose={()=>setCreateModalState(!createModalState)}
                    style={customStyles}
                    contentLabel="Enter Desire Modal"
                    ariaHideApp={false}
                    >
                    <CreatePostModal />            
                </Modal>
                 <div className="max-width">
                    <div className="posts-row">
                        <div className="add-post-card" onClick={
                            ()=>{
                                setCreateModalState(true);
                                audio.currentTime = 0;
                                audio.play()
                            }
                            }>
                            <div className="speaker-phone-container ">
                                <Lottie animationData={Shout} loop={true} className="speaker-phone"/>

                            </div>
                            <h4>Click here to let out your desire</h4>
                        </div>
                    {
                    loading ? (
                        <>
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                        </>) : 
                        (
                            posts.map((post)=>{
                                return(
                                    <div key={post.id}>
                                        <PostCard 
                                            body={post.body}
                                            id={post.id}
                                            primaryColor={post.primaryColor}
                                            secondaryColor={post.secondaryColor}
                                        />
                                    </div>
                                )
                            })
                        )
                }
            </div>
            <PaginationRow />
            
            </div>
        </div> 
        </div>
    )
}


export default Home;