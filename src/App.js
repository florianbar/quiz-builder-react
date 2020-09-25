import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import './App.css';

const QuizBuilder = React.lazy(() => import("./containers/QuizBuilder/QuizBuilder"));
const QuizBuilderProvider = React.lazy(() => import("./context/quizbuilder-context"));

const QuizViewer = React.lazy(() => import("./containers/QuizViewer/QuizViewer"));
const QuizViewerProvider = React.lazy(() => import("./context/quizviewer-context"));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/quiz/create" render={props => (
            <QuizBuilderProvider {...props}>
              <QuizBuilder />
            </QuizBuilderProvider>
          )} />

          <Route path="/quiz/:id" render={props => (
            <QuizViewerProvider {...props}>
              <QuizViewer />
            </QuizViewerProvider>
          )} />
          
          <Route path="/" component={Landing} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
