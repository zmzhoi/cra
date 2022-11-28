import { render } from '@testing-library/react';

import pkg from '../package.json';
import App from './App';

test('App.tsx', () => {
  const result = render(<App />);

  expect(result.getByText(`<${pkg.name} />`)).toBeInTheDocument();
});
