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
    it('should renders correctly', () => {
        renderWithRecoil(<EventWindow />);
    });
    it('should renders correctly', () => {
        renderWithRecoil(<TestApp />);

        screen.debug();
    });
    it('should renders correctly', () => {
        renderWithRecoil(<TestApp />);
        const len = TestApp.length;

        const button = screen.getByRole('button');
        screen.debug();


        fireEvent.click(button);
        const lenafterclick = TestApp.length;
        expect(lenafterclick).equals(len+1);


        /*screen.debug();
        fireEvent.click(button);
        screen.debug();
        fireEvent.click(button);
        screen.debug();*/
    });
});