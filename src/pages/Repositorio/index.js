import React, {useState, useEffect} from 'react';

import {Container} from './styles';
import api from '../../services/api';

export default function Repositorio({match}) {

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function load() {
      const nomeRepositorio = decodeURIComponent(match.params.repositorioParam);

      const [repositorioData, issueData] = await Promise.all([
        api.get(`/repositorio/${nomeRepositorio}`),
        api.get(`/repositorio/${nomeRepositorio}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepositorio(repositorioData.data);
      setIssues(issueData.data);
      setLoading(false);

      //console.log(repositorioData.data);
      //console.log(issueData.data);

    }

    load();

  }, [match.params.repositorioParam]);

  return(
    <Container>
      <h1 style={{color: "#FFF"}}>
        Repositório {decodeURIComponent(match.params.repositorioParam)}
      </h1>
    </Container>
  )
}