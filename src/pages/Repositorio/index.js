import React, {useState, useEffect} from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import {Container, Owner, Loading, BackButton, IssuesList} from './styles';
import api from '../../services/api';

export default function Repositorio({match}) {

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function load() {
      const nomeRepositorio = decodeURIComponent(match.params.repositorioParam);

      // https://api.github.com/repos/facebook/react
      const [repositorioData, issueData] = await Promise.all([
        api.get(`/repos/${nomeRepositorio}`),
        api.get(`/repos/${nomeRepositorio}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepositorio(repositorioData.data);
      setIssues(issueData.data);
      setLoading(false);

      console.log(repositorioData);
      //console.log(issueData.data);

    }

    load();

  }, [match.params.repositorioParam]);

  if (loading) {
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return(
    <Container>
        <BackButton to="/">
          <FaArrowLeft color="#000" size={30} />
        </BackButton>

        <Owner>
          <img 
            src={repositorio.owner.avatar_url} 
            alt={repositorio.owner.login} 
          />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
    </Container>
  )
}