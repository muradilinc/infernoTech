import Layout from './layout/layout';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/client/HomePage';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
