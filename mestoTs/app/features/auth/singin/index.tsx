import { memo } from 'react';
import { SinginView } from '@/app/views/auth-view/singin-view';
import { HeaderView } from '@/app/views/header-view';

export const Singin = memo(() => {
  // const submitInfoProfile = useCallback(async data => {}, []);

  return (
    <>
      <HeaderView href="/singup" logView="Регистрация" />
      <SinginView onSubmit={() => console.log('hi')} title="Вход" />
    </>
  );
});
