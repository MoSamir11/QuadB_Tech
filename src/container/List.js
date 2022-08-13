import React, { useState } from "react";
import {styled,Table,TableBody,Button,TableContainer,TableCell,tableCellClasses,TableHead,Container,TableRow,Paper} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { Link } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#089bab",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const List = () => {
    const [data,setData] = useState();
    var [id,setId] = useState('');
    useEffect(async ()=>{
        await axios.get("https://api.tvmaze.com/search/shows?q=all")
            .then(res=>{
                // console.log("32-->",res.data[0].score);
                let movies =[]
                setData(res.data)
                for(let elem of res.data)
                {
                  movies.push({id:elem.show.id,name:elem.show.name,language:elem.show.language,rating:elem.show.rating.average,summary:elem.show.summary})
                }
                localStorage.setItem("Movies",JSON.stringify(movies))
            })
    },[])
    console.log(data);
  return (
    <Container style={{ padding: "1rem 6rem 0 6rem" }}>
        <h1 className="text-center">Movie List</h1>
        {data && data.length?
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Language</StyledTableCell>
              <StyledTableCell align="right">Rating</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {
               data.map((user,index)=>{
                 return(
                   <>
                   <StyledTableRow key={index+1}>
                      <StyledTableCell align="center">{index+1}</StyledTableCell>
                      <StyledTableCell align="center"><img src={user.show.image.original} style={{height:'3rem', width:'3rem',borderRadius:'50%'}} loading="lazy"/></StyledTableCell>
                      <StyledTableCell align="center">{user.show.name}</StyledTableCell>
                      <StyledTableCell align="center">{user.show.language}</StyledTableCell>
                      <StyledTableCell align="center">{user.show.rating.average}</StyledTableCell>
                      <StyledTableCell align="center"><Link type="button" className="btn btn-sm btn-primary" color="secondary" size="small" to={`/summary/${user.show.id}`}>View</Link></StyledTableCell>
                  </StyledTableRow>
                  </>
                 )
               })
             }
          </TableBody>
        </Table>
      </TableContainer>:<div className="text-center" style={{ marginTop: '20%', marginRight: '6%' }}>
                  <BounceLoader size={100} color="#089bab" />
          </div>}
    </Container>
  );
};
