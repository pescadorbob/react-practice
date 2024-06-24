// Home.test.js
import { render } from '@testing-library/react';
import Home from '../pages/index'; // Adjust the path to your component
import '@testing-library/jest-dom';

describe('Home Component', () => {
  test('renders "Providing houses all over the world!"', () => {

        const { getByText } = render(<Home />);
        const helloText = getByText(/Providing houses all over the world/i);
        expect(helloText).toBeInTheDocument();
  });
});
