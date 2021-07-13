import { render, screen } from '@testing-library/react';
import Header from '../ReusableComponents/Header/Header';

test('should render LoginMain component', () => {
  render(<Header />);
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent('SoundPort');
});
