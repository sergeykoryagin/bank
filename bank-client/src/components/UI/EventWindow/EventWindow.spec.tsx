import { fireEvent, render, screen } from '@testing-library/react';
import { expect } from 'chai';
import { BackButton } from 'components/UI/BackButton';
import { EventWindow } from 'components/UI/EventWindow/index';
import { ReactElement, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { eventsAtom } from 'store/events-atom';

const renderWithRecoil = (component: ReactElement) => render(<RecoilRoot>{component}</RecoilRoot>);

const TestApp = () => {
    const [events, setEvents] = useRecoilState(eventsAtom);

    useEffect(() => {
        setEvents(['dfghjkl', 'dfghjkl', 'awdawda']);
    }, []);

    const handleClick = () => {
        setEvents([...events, `new event №${events.length}`]);
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
        renderWithRecoil(<EventWindow />);
    });
    it('should render correctly', () => {
        renderWithRecoil(<TestApp />);

        screen.debug();
    });
    /*it('should render correctly', () => {
        const {container} = renderWithRecoil(<TestApp />);
        const ul = container.querySelector('ul');

        const button = screen.getAllByRole('button');
        //screen.debug();
        const len = console.log(ul?.childElementCount);


        fireEvent.click(button[0]);

        
        expect(console.log(ul?.childElementCount)).equals(4);
    });*/
});