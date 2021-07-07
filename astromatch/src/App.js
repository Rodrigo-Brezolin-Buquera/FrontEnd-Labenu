import axios from "axios"
import { useState } from "react";
import styled from "styled-components"
import Matches from "./pages/matches";
import CardFoto from "./pages/CardFoto";
import {BaseURL} from "./components/baseURL/baseURL"

const MainContainer = styled.div`
display: flex;
justify-content: center;
` 

export default function App(props) {
  const [page, setpage] = useState(true)
  
  const changePage = () => {
    setpage(!page)
  }

  const clearMatches = () => {
    const URL = `${BaseURL}/clear`
    axios.put(URL)
    .then((res) =>{
      console.log(res.data.message)     
    })
    .catch((err) =>{
      alert(err.message)
    })
  }

  return (
    <MainContainer >
  
     {page ? 
     <CardFoto 
     changePage={changePage}
     clearMatches={clearMatches} 
     /> 
     : 
     <Matches 
     changePage={changePage}
     clearMatches={clearMatches} 
     />}
    
    </MainContainer>
  );
}


