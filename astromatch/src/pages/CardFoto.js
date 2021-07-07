import React, { useEffect, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/logoAstromatch.png';
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {LogoAstro, HeaderCard, ContButtons, ContMedia} from "./Styled";
import { green } from '@material-ui/core/colors';
import throbber from "../assets/throbber.gif"
import {BaseURL} from "../components/baseURL/baseURL"

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 700,
  },
});

export default function CardFoto(props) {
  const [person, setPerson] = useState({})
  const classes = useStyles();
  
  useEffect(()=>{
   getPerson()
  }, [])

  const addPerson = () => {
    const URL = `${BaseURL}/choose-person`
    const body = {
      id: person.id,
      choice: true
    }
    axios.post(URL, body)
    .then((res) => {
      getPerson()
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  const getPerson = () => {
    const URL = `${BaseURL}/person`
    axios.get(URL)
    .then((res)=>{
      setPerson(res.data.profile)
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  return (

    <Card className={classes.root}>
      <HeaderCard>

        <LogoAstro src={Logo} alt="logo Astromatch"/>

        <Button size="small">
          <GroupAddIcon fontSize="large"  onClick={props.changePage}/>
        </Button>      

      </HeaderCard>

      <CardActionArea>

        <ContMedia>

          {
          person.photo ? 
          (
            <CardMedia
            className={classes.media}
            image={person.photo}
            title="foto perfil"
          />
          ) 
          : 
          <img src={throbber} alt="loading"/>          
          }

        </ContMedia>

        <CardContent>

          <Typography gutterBottom variant="h5" component="h2">
            {person.name}, {person.age}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
          {person.bio}
          </Typography>

        </CardContent>

      </CardActionArea>

      <CardActions>

         <ContButtons>
            <Button
              variant="outlined" 
              size="small" 
              color="secondary"
              onClick = {getPerson}
            >
              <CancelIcon fontSize="large" />
            </Button>
          
            <Button 
              variant="outlined"
              size="small" 
              color="primary"
              onClick = {addPerson}
            >
              <CheckIcon  style={{ color: green[500]}} fontSize="large" />
            </Button>

            <Button 
              variant="contained" 
              color="primary"
              onClick={props.clearMatches}
            >Limpar tudo
            </Button>

        </ContButtons>
      </CardActions>
    </Card>
  );
}
