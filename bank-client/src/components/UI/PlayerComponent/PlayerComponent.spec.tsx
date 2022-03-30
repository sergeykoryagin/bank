import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement, useEffect } from 'react';
import { PlayerComponent } from 'components/UI/PlayerComponent/index';
import { Player } from 'interfaces/player';
import { useModal } from 'hooks/useModal';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { eventsAtom } from 'store/events-atom';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';


let testplayer : Player =
{
    money: 1000,
    id: 'playerid',
    color: 'black',
    username: 'playername',
}
const faceControl = true;
describe('PlayerComponent', () => {
    it('should renders correctly', () => {
        render( <PlayerComponent player={testplayer} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should renders correctly with tie', () => {
        render( <PlayerComponent player={testplayer} faceControl />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});

