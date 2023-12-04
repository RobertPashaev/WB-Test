import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Providers } from '@/app/features/providers/Provider';
import { store } from '../app/store/store';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Providers>
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pageProps}
        />
      </Providers>
    </Provider>
  );
};

export default App;
