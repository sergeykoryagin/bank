import { render, screen } from '@testing-library/react';
import { Logo } from 'components/UI/Logo/index';


describe('Logo component', () => {
    it('should renders correctly', () => {
        const {container} = render(<Logo />);
        expect(screen.getByText(/bankomat/i)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });


});
