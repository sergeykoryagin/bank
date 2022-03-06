import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from 'components/UI/Input/index';

describe('Input component', () => {
    it('should renders correctly', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    it('should renders correctly', () => {
        render(<Input />);
        const input: HTMLInputElement = screen.getByRole('textbox');

        userEvent.type(input, 'hello');

        expect(input.value).toBe('hello');
    });
});
