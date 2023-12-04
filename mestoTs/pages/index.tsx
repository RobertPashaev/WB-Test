import React from 'react';
import { NextPage } from 'next/types';
import { Cards } from '@/app/features/cards';
import { Footer } from '@/pages/page/main/_components/footer';
import { Profile } from '@/app/features/profile';
import { Header } from '../app/features/header';

const Page: NextPage = () => (
  <>
    <Header />
    <Profile />
    <Cards />
    <Footer />
  </>
);

export default Page;
