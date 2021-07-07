import React from 'react'
import { Vert2MainContainer, Title, ContFlex, RightImg } from "../constants/Styled/Styled";
import { ApplicationForm } from "../components/ApplicationForms/ApplicationForms"
import { goToLastPage } from "../route/Coordinator";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Astronaut from "../assets/Astronaut.png"

const ApplicationFormPage = () => {
  const history = useHistory();

  return (
    <Vert2MainContainer>

      <Title>Inscreva-se para uma viagem</Title>

      <ContFlex>
        <ApplicationForm />
        <RightImg src={Astronaut} alt="imagem astronauta" />
      </ContFlex>


      <Button
        onClick={() => goToLastPage(history)}
        colorScheme="brand"
        size="lg"
        color="#251D44"
      >
        Voltar
      </Button>

    </Vert2MainContainer>
  )
}

export default ApplicationFormPage
