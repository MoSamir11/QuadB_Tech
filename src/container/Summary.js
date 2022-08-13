import React, { useState } from "react";
import {styled,Table,TableBody,Button,TableContainer,TableCell,tableCellClasses,TableHead,Container,TableRow,Paper} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { useParams } from 'react-router-dom';

export const Summary = () => {
   const [data,setData] = useState();
   const [oneData,setOneData] = useState();
   var params = useParams();
    useEffect(async ()=>{
       var data = await JSON.parse(localStorage.getItem("Movies"))
       console.log("11-->",data);
       let id = params.id
       console.log("16-->",id);
       setData(data);
       var myData = data.filter((user)=>{
         return user.id == id
       });
       console.log("20-->",myData);
       setOneData(myData)
       console.log("23-->",oneData);
    },[])
    
  return (
    <Container style={{ padding: "6rem 6rem 0 6rem" }}>
       <h1>Summary</h1>
       <div className="card" style={{width:'30vw'}}>
         {oneData? <div className="card-body">
            <p>Id:{oneData[0].id?oneData[0].id:''}</p>
            <p>Name: {oneData[0].name?oneData[0].name:''}</p>
            <p>Language: {oneData[0].language?oneData[0].language:''}</p>
            <p>Rating: {oneData[0].rating?oneData[0].rating:''}</p>
            <p>{oneData[0].summary?oneData[0].summary:''}</p>
          </div>:''}
       </div>
    </Container>
  );
};
