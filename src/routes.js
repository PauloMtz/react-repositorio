import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; // npm install react-router-dom

/*
    para utilizar o Switch, alterar a versão do react-router-dom lá no package.json
    para 5.3.3 e depois tem que instalar tudo de novo - npm install
*/

import Home from './pages/Home';
import Repositorio from './pages/Repositorio';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/repositorio/:repositorio" component={Repositorio} />
            </Switch>
        </BrowserRouter>
    );
}
