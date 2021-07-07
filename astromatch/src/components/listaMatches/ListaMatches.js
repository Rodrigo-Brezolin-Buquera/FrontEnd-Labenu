import React, { useEffect, useState } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import {BaseURL} from "../../components/baseURL/baseURL"

const ListContainer = styled.div`
display: flex;
gap: 1em;
align-items: center;
padding: 0.5em 1em ;
`

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ListaMatches(props) {
  const [lista, setLista] = useState([])
  const classes = useStyles();
  
  useEffect(()=>{
    getMatches()
  },[lista, setLista])

  const getMatches = () => {
    const URL = `${BaseURL}/matches`
    axios.get(URL)
    .then((res)=> {
      setLista(res.data.matches)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div>
      
      {    
      lista.length ? 
      (lista.map((person)=> {
        return (
          <ListContainer>  
            <Avatar 
              alt={person.name} 
              src={person.photo} 
              className={classes.large}
            />

            <Typography variant="body2" color="textInherit" component="p">
            {person.name}
            </Typography>

          </ListContainer>
        )
      })
      )
      :
      <Typography variant="body2" color="textInherit" component="p">
        Ninguém quer você
      </Typography>
      
      }

    </div>
  );
}

