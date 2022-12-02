import React, { useEffect, useState } from 'react'
import './App.css';
import Card from './components/card';
import axios from "axios";







function App() {
  const [postData, setPostData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  React.useEffect(() => {

    axios.get(`https://dummyapi.io/data/v1/post/?limit=20`, {
      headers : {"app-id": "6387b00ac20bb7956c1062d4"}
    }).then((response) => {
      setPostData(response.data.data);
    });
  }, []);

  const  filterLikedPost = () => {
    if(filterActive === false){
      setFilterActive(true);
    }else{
      setFilterActive(false);
    }
  }

  if (!postData) return "No post!";

  return (
    <div className="App">
      <div className="my-2 top-0 rounded  text-center">

        <button onClick={filterLikedPost} className={filterActive?"bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4":"bg-violet-400 hover:bg-blue-400 text-white font-bold py-2 px-4"}>
            Filter by Like
        </button>

      </div>
      <div className="posts my-10">
        {postData.map((postData, index) => (
          <Card filter={filterActive} key={index} postdata={postData} />  
        ))}
      </div>
    </div>
  );
}

export default App;
