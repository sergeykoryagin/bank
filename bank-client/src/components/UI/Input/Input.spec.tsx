import { render, screen } from '@testing-library/react';
import { Input } from 'components/UI/Input/index';

describe('Input component', () => {
    it('should renders correctly', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    it('should renders with placeholder', () => {
        render(<Input placeholder='test placeholder' />);
        const input = screen.getByRole('textbox');
        expect(input.getAttribute('placeholder')).toBe('test placeholder');
    });
    it('should renders focused', () => {
        render(<Input autoFocus />);
        const input = screen.getByRole('textbox');
        expect(document.activeElement).toBe(input);
    });
    it('should renders with value', () => {
        render(<Input value='test text' onChange={() => void 0} />);
        const input: HTMLInputElement = screen.getByRole('textbox');
        expect(input.value).toBe('test text');
    });
});
