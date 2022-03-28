import { render, screen } from '@testing-library/react';
import { ReactElement, useEffect } from 'react';
import { BankComponent } from 'components/UI/BankComponent/index';
import { useModal } from 'hooks/useModal';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { BankOperationModal } from 'components/modals/BankOperationModal';
import { eventsAtom } from 'store/events-atom';
import { Bank } from 'interfaces/bank';


let testbank : Bank 
{
    money : 1000;

}

const renderWithRecoil = (component: ReactElement) => render(<RecoilRoot>{component}</RecoilRoot>);

const TestApp = () => {
    const { setModal } = useModal();


    const handleClick = () => {
        setModal(<BankOperationModal />);
    };
    return (
        <div>
            <BankComponent bank={testbank}/>
            <button onClick={handleClick} />
        </div>
    );
};

describe('BankComponent', () => {
    it('should renders correctly', () => {
        renderWithRecoil(<TestApp />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });



});

