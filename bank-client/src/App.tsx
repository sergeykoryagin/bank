import { useEffect, VFC } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { SocketProvider } from 'context/SocketContext';
import { authAtom } from 'store/auth-atom';
import { Game } from 'pages/Game';
import { Lobby } from 'pages/Lobby';
import { Menu } from 'pages/Menu';
import { Home } from 'pages/Home';

const App: VFC = () => {
    const { isAuth } = useRecoilValue(authAtom);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth]);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='menu' element={<Menu />} />
            <Route path='lobby'>
                <Route path=':gameId' element={<Lobby />} />
            </Route>
            <Route path='game'>
                <Route path=':gameId' element={<Game />} />
            </Route>
        </Routes>
    );
};

export default function AppWrapper() {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <RecoilNexus />
                <SocketProvider>
                    <App />
                </SocketProvider>
            </RecoilRoot>
        </BrowserRouter>
    );
}
