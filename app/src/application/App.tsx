import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter, routes } from '../navigation';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRouter routes={routes} />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
