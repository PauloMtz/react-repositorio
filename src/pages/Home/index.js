import React from "react";

import { FaGithub, FaPlus } from 'react-icons/fa'; // npm install react-icons
import {Container, Form, SubmitButton} from './styles';

export default function Home() {
  return(
    <Container>
      
      <h1>
        <FaGithub size={25}/>
        Meus Repositorios
      </h1>

      <Form onSubmit={()=>{}}>
        <input type="text" placeholder="Adicionar Repositorio"/>

        <SubmitButton>
          <FaPlus color="#FFF" size={14}/>
        </SubmitButton>

      </Form>

    </Container>
  )
}
