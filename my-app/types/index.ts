import { z } from 'zod';
import { dataSchema } from '@/schema';

export type PaymentSystem = {
  Rate: number;
  Name: string;
};

export type Acquirer = {
  Percent?: number;
  PS: PaymentSystem[];
  Name: string;
};

export type ModalForm = {
  Country: string;
  Currency: string;
  Acquirers: Acquirer[];
};

export type MainForm = z.infer<typeof dataSchema>;
