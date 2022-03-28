import { render, screen } from '@testing-library/react';
import { Logo } from 'components/UI/Logo/index';


describe('Logo component', () => {
    it('should renders correctly', () => {
        const {container} = render(<Logo />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });


});
