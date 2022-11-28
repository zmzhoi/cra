import Layout from '@/components/Layout';

import pkg from '../package.json';

function App() {
  /**
   * Remove code below
   */
  return <Layout>{`<${pkg.name} />`}</Layout>;
}

export default App;
