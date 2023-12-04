import { memo } from 'react';
import { SingupView } from '@/app/views/auth-view/singup-view';
import { HeaderView } from '@/app/views/header-view';

export const Singup = memo(() => {
  // const submitInfoProfile = useCallback(async data => {}, []);

  return (
    <>
      <HeaderView href="/singin" logView="Войти" />
      <SingupView onSubmit={() => console.log('hi')} title="Регистрация" />
    </>
  );
});
