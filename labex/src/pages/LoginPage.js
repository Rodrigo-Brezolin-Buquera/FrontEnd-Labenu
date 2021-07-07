import React from 'react'
import { useHistory } from "react-router-dom";
import { goToLastPage, goToAdminHome } from "../route/Coordinator";
import {
  MainContainer,
  BoxContainer,
  ButtonsContainer,
  Title,
  Input
} from "../constants/Styled/Styled";
import { Button } from "@chakra-ui/react";
import useInput from "../hooks/useInput";
import axios from "axios"
import { baseURL } from '../constants/baseURL';

const LoginPage = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const history = useHistory();

  const loginAdmin = () => {
    const URL = `${baseURL}/login`
    const body = { email, password };

    axios.post(URL, body)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        goToAdminHome(history)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }

  return (
    <MainContainer>
      <BoxContainer>

        <Title>Login</Title>

        <Input
          value={email}
          onChange={setEmail}
          placeholder="email"
        />

        <Input
          value={password}
          onChange={setPassword}
          placeholder="senha"
          type="password"
        />

        <ButtonsContainer>
          <Button
            onClick={() => goToLastPage(history)}
            colorScheme="brand"
            size="lg"
            color="#251D44"
          >
            Voltar
          </Button>

          <Button
            onClick={() => loginAdmin()}
            colorScheme="brand"
            size="lg"
            color="#251D44"
          >
            Entrar
          </Button>

        </ButtonsContainer>
      </BoxContainer>
    </MainContainer>
  )
}

export default LoginPage
