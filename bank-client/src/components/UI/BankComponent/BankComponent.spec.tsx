import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement, useEffect } from 'react';
import { BankComponent } from 'components/UI/BankComponent/index';
import { useModal } from 'hooks/useModal';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { BankOperationModal } from 'components/modals/BankOperationModal';
import { eventsAtom } from 'store/events-atom';
import { Bank } from 'interfaces/bank';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';


let testbank : Bank 
{
    money : 1000;

}

const renderWithRecoil = (component: ReactElement) => render(<RecoilRoot>{component}</RecoilRoot>);

const TestApp = () => {
    return (
        <>
            <BankComponent bank={testbank} />
            <ModalConstructor />
            <div id='modal' />
        </>
    );
};

describe('BankComponent', () => {
    it('should renders correctly', () => {
        renderWithRecoil( <BankComponent bank={testbank} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should open modal after click', () => {
        const { container } = renderWithRecoil(<TestApp />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(button);

        const modal = container.querySelector('.modal');

        expect(modal).toBeInTheDocument();
    });

});

