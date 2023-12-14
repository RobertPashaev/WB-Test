import z from 'zod';
import json from '../constants/api.json';

export const dataSchema = z.array(
  z.object({
    Country: z.string(),
    Currency: z.string(),
    Acquirers: z.array(
      z.object({
        Percent: z.number().optional(),
        PS: z.array(
          z.object({
            Rate: z.number(),
            Name: z.string(),
          }),
        ),
        Name: z.string(),
      }),
    ),
  }),
);

const formSchema = z.object({
  Country: z.string().min(1, 'Это поле обязательно'),
  Currency: z.string().min(1, 'Это поле обязательно'),
  Acquirers: z
    .array(
      z.object({
        Percent: z.number().optional(),
        PS: z
          .array(
            z.object({
              Rate: z.number().min(1, 'Ставка должна быть больше 0'),
              Name: z.string().min(1, 'Это поле обязательно'),
            }),
          )
          .min(1, 'Должен быть минимум 1 вложенный элемент Pay System'),
        Name: z.string().min(1, 'Это поле обязательно'),
      }),
    )
    .min(1, 'Объект эквайера не может быть быть пустым'),
});
export const formSchemaRefine = formSchema.superRefine((data, ctx) => {
  if (data.Acquirers.length > 1) {
    const totalPercent = data.Acquirers.reduce((sum, acquirer) => (acquirer.Percent ? sum + acquirer.Percent : sum), 0);
    if (totalPercent !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [`Acquirers`],
        message: `Cумма процентов должна быть равна 100, текущая сумма: ${totalPercent}`,
      });
    }
  }
});

export const parseResult = dataSchema.safeParse(json);
