import React, { useState, useCallback , useEffect} from "react";
import { Link } from "react-router-dom";

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'; // npm install react-icons
import {Container, Form, SubmitButton, List, DeleteButton } from './styles';

import api from '../../services/api';

export default function Home() {
  const [newRepositorio, setNewRepositorio] = useState('');
  const [repositorios, setRepositorios] = useState([]); // inicia com um array vazio
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // DidMount - Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('_repositorios');

    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  // DidUpdate - Salvar
  useEffect(() => {
    localStorage.setItem('_repositorios', JSON.stringify(repositorios));
  }, [repositorios]);

  function handleInputChange(evento) {
    setNewRepositorio(evento.target.value);
    //console.log(evento.target.value);
    setAlert(null);
  }

  // poderia ser essa função abaixo
  // porém será utilizado o useCallback
  /*async function handleSubmit(evento) {
    evento.preventDefault();
    //console.log(newRepositorio);

    // https://api.github.com/repos/facebook/react
    const response = await api.get(`/repos/${newRepositorio}`);

    console.log(response.data);

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
      setAlert(null);

      try {

        // mostra mensagem no console por causa do catch
        if (newRepositorio === '') {
          throw new Error('Precisa indicar o repositório.');
        }

        // https://api.github.com/repos/facebook/react
        const response = await api.get(`/repos/${newRepositorio}`);

        // verifica se já tem o repositório na lista
        const hasRepositorio = repositorios.find(repo => repo.name === newRepositorio);

        if (hasRepositorio) {
          throw new Error('Esse repositório já está na lista.');
        }

        const dados = {
          name: response.data.full_name
        }

        setRepositorios([...repositorios, dados]);
        setNewRepositorio('');
        console.log(dados);
      } catch (erro) {
        setAlert(true);
        console.log(erro);
      } finally {
        // terminou tudo, volta o loading para falso
        setLoading(false);
      }
    }

    submit();
  }, [newRepositorio, repositorios]);

  const handleDelete = useCallback((repo)=> {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios]);

  return(
    <Container>
      
      <h1>
        <FaGithub size={25}/>
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} erroProp={alert}>
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

      <List>
         {repositorios.map(repo => (
           <li key={repo.name}>
             <span>
             <DeleteButton onClick={()=> handleDelete(repo.name) }>
                <FaTrash size={14}/>
             </DeleteButton>  
             {repo.name}
             </span>
             <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
               <FaBars size={20}/>
             </Link>
           </li>
         ))} 
      </List>

    </Container>
  )
}
