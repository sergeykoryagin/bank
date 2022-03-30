import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from 'components/UI/Switch/index';

describe('Switch component', () => {
    it('should render correctly', () => {
        render(<Switch />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should renders checked', () => {
        render(<Switch checked={true} onChange={() => void 0} />);
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement).toBeChecked();
    });

    it('should renders className', () => {
        render(<Switch className='testClassName' />);
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement.parentElement?.classList.contains('testClassName')).toBe(true);
    });

    it('should renders disabled', () => {
        render(<Switch disabled={true} />);
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement).toBeDisabled();
    });

    it('should renders name', () => {
        render(<Switch name='testname' />);
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement.getAttribute('name')).toBe('testname');
    });

    it('should renders with onChange', () => {
        const handleChange = jest.fn();
        render(<Switch name='test name' onChange={handleChange} />);
        const switchElement = screen.getByRole('checkbox');

        fireEvent.click(switchElement);

        expect(handleChange).toBeCalled();
    });
});
