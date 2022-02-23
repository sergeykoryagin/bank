import { SocketProvider } from 'context/SocketContext';
import { Game } from 'pages/Game';
import { VFC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { RecoilRoot } from 'recoil';

const App: VFC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='game'>
                    <Route path=':gameId' element={<Game />} />
                </Route>
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
