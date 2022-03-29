import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement, useEffect } from 'react';
import { Switch, Props } from 'components/UI/Switch/index';
import { useModal } from 'hooks/useModal';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { eventsAtom } from 'store/events-atom';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';


const testplacechecked = true;
describe('Switch component', () => {
    it('should render correctly', () => {
        render(<Switch />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });


    /*it('should renders checked', () => {
        render(<Switch  checked={true} />);
        const input = screen.getByRole('textbox');
        expect(input.getAttribute('placeholder')).toBe('test placeholder');
    });*/


    /*it('should renders className', () => {
        render(<Switch className ='testclassname' />);
        const input = screen.getByRole('checkbox');
        expect(input.getAttribute('className')).toBe('testclassname');
    });*/

    /*it('should renders disabled', () => {
        render(<Switch disabled = {true} />);
        const input = screen.getByRole('textbox');
       expect(document.activeElement).toBe(input);
    });*/

    /*it('should renders name', () => {
        render(<Switch name ='testname' />);
        const input = screen.getByRole('checkbox');
        expect(document.activeElement).toBe(input);
    });*/

    
    
    /*it('should renders with onChange', () => {
        render(<Switch name='test name' onChange={() => void 0} />);
        const switc : HTMLInputElement = screen.getByRole('checkbox');
        expect(switc.name).toBe('test name');
    });*/
});
