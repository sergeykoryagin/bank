import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement, useEffect } from 'react';
import { SmallButton } from 'components/UI/SmallButton/index';
import {  Props } from 'components/UI/SmallButton/index';
import { useModal } from 'hooks/useModal';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { eventsAtom } from 'store/events-atom';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';


let testprops  : Props =
{
    icon: true,
    text: 'testtext',
};

let testprops2  : Props =
{
    className: 'classname',
    icon: true,
    text: 'testtext',
};

describe('PlayerComponent', () => {
    it('should render with text, icon', () => {
        render( <SmallButton {...testprops}  />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should render with text, icon, classname', () => {
        render( <SmallButton {...testprops2}  />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
   
});


