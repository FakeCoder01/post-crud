import React, { useEffect, useState } from 'react';
import axios from "axios";



function Card(props) {

    

    const [likePost, setLikePost] = useState(false);
    const [totalLike, setTotalLike] = useState(parseInt(props.postdata.likes));
    const [postID, setPostID] = useState(props.postdata.id);

    function likeThePost(){

        if(likePost === false){
            
            axios({
                method: 'put',
                url: `https://dummyapi.io/data/v1/post/${postID}/`,
                headers : {"app-id": "6387b00ac20bb7956c1062d4"},
                data: {
                    likes: parseInt(totalLike)+1,
                }
            }).then((response) => {
                setLikePost(true);
                setTotalLike(parseInt(response.data.likes))
            });
        }else{
            axios({
                method: 'put',
                url: `https://dummyapi.io/data/v1/post/${postID}/`,
                headers : {"app-id": "6387b00ac20bb7956c1062d4"},
                data: {
                    likes: parseInt(totalLike)-1,
                }
            }).then((response) => {
                setLikePost(false);
                setTotalLike(parseInt(response.data.likes))
            });
        }
        
    }


    function deleteThePost(){
        document.getElementById(postID).style.display = 'none';
        axios.delete(`https://dummyapi.io/data/v1/post/${postID}/`, {
            headers : {"app-id": "6387b00ac20bb7956c1062d4"},
        }).then((response) => {
            alert("Deleted");
        });
    }
    if(props.filter === false || (props.filter === true && likePost === true) ){
        return (
            <div id={postID} className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-2 max-w-md md:max-w-md">
                <div className="px-4 py-6">
                    <div className="">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={props.postdata.owner.picture} alt="avatar"/>
                                    <h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.postdata.owner.firstName} {props.postdata.owner.lastName}</h2>
                            </div>
                            <small className="text-sm text-red-500 hover:text-red-600 "><button onClick={deleteThePost} className="">Delete</button></small>
                        </div>

                        <div className="cursor-pointer">
                            <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" src={props.postdata.image} alt="props image"/>
                            <p className="text-start mt-3 text-gray-700 text-sm w-[416px]">
                                {props.postdata.text}
                            </p>
                            <div className="mt-4 flex items-center">
                                <div className="flex mr-2 text-gray-700 text-sm mr-3">
                                    <button onClick={likeThePost} type="button" role="button">
                                        <svg fill={likePost?"red":"none"} viewBox="0 0 24 24" className="w-8 h-8 mr-2" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        </button>
                                    <span className="mt-1 w-full"> {totalLike} likes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return
    }
}


export default Card;
