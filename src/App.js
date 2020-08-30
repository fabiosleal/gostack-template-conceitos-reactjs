import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      "title": "Front-end com React JS",
      "url": "github.com.br/fabiosleal/desafio-conceitos-nodejs",
      "techs": ["Node.js", "Express", "Javascript"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);

    const updatedRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
