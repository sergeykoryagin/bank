import { fireEvent, render, screen } from '@testing-library/react';
import { EventWindow } from 'components/UI/EventWindow/index';
import { ReactElement, useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { eventsAtom } from 'store/events-atom';

const renderWithRecoil = (component: ReactElement) => render(<RecoilRoot>{component}</RecoilRoot>);

const TestApp = () => {
    const [events, setEvents] = useRecoilState(eventsAtom);

    useEffect(() => {
        setEvents(['event №1', 'event №2', 'event №3']);
    }, []);

    const handleClick = () => {
        setEvents([...events, `event №${events.length}`]);
    };
    return (
        <div>
            <EventWindow />
            <button onClick={handleClick} />
        </div>
    );
};

describe('Input component', () => {
    it('should render correctly', () => {
        const { container } = renderWithRecoil(<EventWindow />);
        expect(container).toMatchSnapshot();
    });
    it('should render correctly', () => {
        renderWithRecoil(<TestApp />);
        expect(screen.getByText('event №1')).toBeInTheDocument();
        expect(screen.getByText('event №2')).toBeInTheDocument();
        expect(screen.getByText('event №3')).toBeInTheDocument();
    });
    // it('should render correctly', () => {
    //     const { container } = renderWithRecoil(<TestApp />);
    //     const ul = container.querySelector('ul');
    //
    //     const button = screen.getAllByRole('button');
    //
    //     fireEvent.click(button[0]);
    //
    //     expect(ul?.childElementCount).toBe(4);
    //     expect(screen.getByText('event №4')).toBeInTheDocument();
    // });
});
