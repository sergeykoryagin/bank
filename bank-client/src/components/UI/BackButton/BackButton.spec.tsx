import { fireEvent, render, screen } from '@testing-library/react';
import { BackButton } from 'components/UI/BackButton/index';
import { ReactElement } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const renderWithRouter = (component: ReactElement) =>
    render(<MemoryRouter>{component}</MemoryRouter>);

const TestApp = () => {
    return (
        <div>
            <BackButton href='/menu' />
            <Routes>
                <Route path='/' element={<div>home page</div>} />
                <Route path='/menu' element={<div>menu page</div>} />
            </Routes>
        </div>
    );
};

describe('BackButton component', () => {
    it('should renders correctly', () => {
        const { container } = renderWithRouter(<BackButton href='' />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('should navigate after click', () => {
        renderWithRouter(<TestApp />);
        expect(screen.getByText(/home page/i)).toBeInTheDocument();
        expect(screen.queryByText(/menu page/i)).not.toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(screen.queryByText(/home page/i)).not.toBeInTheDocument();
        expect(screen.getByText(/menu page/i)).toBeInTheDocument();
    });
});
