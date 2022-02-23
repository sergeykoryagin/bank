import { VFC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { SocketProvider } from 'context/SocketContext';
import { authAtom } from 'store/auth-atom';
import { Game } from 'pages/Game';
import { Lobby } from 'pages/Lobby';
import { Menu } from 'pages/Menu';
import { Home } from 'pages/Home';

const App: VFC = () => {
    const { isAuth } = useRecoilValue(authAtom);
    return (
        <BrowserRouter>
            <Routes>
                {!isAuth ? (
                    <Route path='*' element={<Home />} />
                ) : (
                    <>
                        <Route path='*' element={<Menu />} />
                        <Route path='game'>
                            <Route path='lobby' element={<Lobby />} />
                            <Route path=':gameId' element={<Game />} />
                        </Route>
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default function AppWrapper() {
    return (
        <RecoilRoot>
            <SocketProvider>
                <App />
            </SocketProvider>
        </RecoilRoot>
    );
}
