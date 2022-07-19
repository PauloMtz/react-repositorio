import React, { useState, useCallback } from "react";

import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa'; // npm install react-icons
import {Container, Form, SubmitButton} from './styles';

import api from '../../services/api';

export default function Home() {
  const [newRepositorio, setNewRepositorio] = useState('');
  const [repositorios, setRepositorios] = useState([]); // inicia com um array vazio
  const [loading, setLoading] = useState(false);

  function handleInputChange(evento) {
    setNewRepositorio(evento.target.value);
    //console.log(evento.target.value);
  }

  // poderia ser essa função abaixo
  // porém será utilizado o useCallback
  /*async function handleSubmit(evento) {
    evento.preventDefault();
    //console.log(newRepositorio);

    // https://api.github.com/repos/facebook/react
    const response = await api.get(`/repos/${newRepositorio}`);

    //console.log(response.data);

    const dados = {
      name: response.data.full_name,
    }

    setRepositorios([...repositorios, dados]);
    setNewRepositorio('');
    console.log(dados);
  }*/

  const handleSubmit = useCallback((evento) => {
    evento.preventDefault();

    async function submit() {
      // clicou no submit, habilita o loading
      setLoading(true);

      try {
        // https://api.github.com/repos/facebook/react
        const response = await api.get(`/repos/${newRepositorio}`);

        const dados = {
          name: response.data.full_name,
        }

        setRepositorios([...repositorios, dados]);
        setNewRepositorio('');
        console.log(dados);
      } catch (erro) {
        console.log(erro);
      } finally {
        // terminou tudo, volta o loading para falso
        setLoading(false);
      }
    }

    submit();
  }, [newRepositorio, repositorios]);

  return(
    <Container>
      
      <h1>
        <FaGithub size={25}/>
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Adicionar Repositorio"
          value={newRepositorio}
          onChange={handleInputChange} />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>

      </Form>

    </Container>
  )
}
