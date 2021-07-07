import React from "react";
import {
  MainContainer,
  BoxContainer,
  ButtonsContainer,
  Title,
} from "../constants/Styled/Styled";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { goToTripsList, goToLogin } from "../route/Coordinator";

const HomePage = () => {
  const history = useHistory();

  return (
    <MainContainer>
      <BoxContainer>
        <Title>LabeX</Title>

        <ButtonsContainer>
          <Button
            onClick={() => goToTripsList(history)}
            colorScheme="brand"
            size="lg"
            color="#251D44"
          >
            Lista de viagens
          </Button>

          <Button
            onClick={() => goToLogin(history)}
            colorScheme="brand"
            size="lg"
            color="#251D44"
          >
            Login Admin
          </Button>
        </ButtonsContainer>
      </BoxContainer>

    </MainContainer>
  );
};

export default HomePage;
