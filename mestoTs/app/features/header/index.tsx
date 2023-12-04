'use client';

/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react';
import { useSession } from 'next-auth/react';
import { HeaderView } from '@/app/views/header-view';

export const Header = memo(() => {
  const session = useSession();

  return <HeaderView email="props" href="/singin" logView="Войти" />;
});
