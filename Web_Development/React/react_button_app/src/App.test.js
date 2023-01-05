import { render, screen } from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  render(<App />);
  const counterEl = screen.getByTestId("counter");
  expect(counterEl).toHaveTextContent(0);
});
