import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import QuizBuilder from './containers/QuizBuilder/QuizBuilder';
import QuizBuilderProvider from './context/quizbuilder-context';
import QuizViewer from './containers/QuizViewer/QuizViewer';
import QuizViewerProvider from './context/quizviewer-context';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/quiz/create" render={props => <QuizBuilderProvider {...props}><QuizBuilder /></QuizBuilderProvider>} />
        <Route path="/quiz/:id" render={props => <QuizViewerProvider {...props}><QuizViewer /></QuizViewerProvider>} />
        <Route path="/" component={Landing} />
      </Switch>
    </Layout>
  );
}

export default App;
