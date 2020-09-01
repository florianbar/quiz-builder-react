import React from 'react';

import './App.css';
import Layout from './hoc/Layout/Layout';
import QuizBuilder from './containers/QuizBuilder/QuizBuilder';

function App() {
  return (
    <Layout>
      <QuizBuilder />
    </Layout>
  );
}

export default App;
