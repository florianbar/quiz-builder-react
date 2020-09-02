import React from 'react';

import { Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import QuizBuilder from './containers/QuizBuilder/QuizBuilder';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/quiz/create" component={QuizBuilder} />
        <Route path="/" component={Landing} />
      </Switch>
    </Layout>
  );
}

export default App;
