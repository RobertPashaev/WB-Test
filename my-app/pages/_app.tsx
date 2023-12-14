import type { AppProps } from 'next/app';
import '../styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...pageProps}
    />
  );
};

export default App;
