import { useForm } from 'react-hook-form';

import { CurrencyBalance, IConverterForm, TCurrency } from '@/types';
import { Button } from '@/ui/button';
import { Error } from '@/ui/error';
import { Heading } from '@/ui/heading';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

import styles from './converter.module.css';

interface Props {
  all: TCurrency[];
  mine: CurrencyBalance[];
  isLoading: boolean;
  onSubmit: (data: IConverterForm) => void;
}

export const Converter = ({ all, mine, isLoading, onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IConverterForm>({
    mode: 'onBlur',
  });

  const fromCurrency = watch('from');
  const toCurrency = watch('to');

  return (
    <div className={styles.converter}>
      <Heading level="h3" size="sizeSmall" marginBottom="mbSmall">
        Обмен валюты
      </Heading>

      <form
        className={styles.converterForm}
        onSubmit={handleSubmit(data => {
          onSubmit(data);
          reset();
        })}
      >
        <div className={styles.converterFormWrapper}>
          <div className={styles.converterInputWrapper}>
            {errors.from && <Error message={errors.from.message} />}
            <Label htmlFor="from">Откуда</Label>
            <select
              {...register('from', {
                required: 'Выберите валюту',
              })}
              className={styles.converterSelect}
              id="from"
              aria-invalid={!!errors.from}
              disabled={isLoading}
            >
              {mine.map(currency => (
                <option
                  key={currency.code}
                  value={currency.code}
                  disabled={toCurrency === currency.code}
                >
                  {currency.code}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.converterInputWrapper}>
            {errors.to && <Error message={errors.to.message} />}
            <Label htmlFor="to">Куда</Label>
            <select
              {...register('to', {
                required: 'Выберите валюту',
              })}
              className={styles.converterSelect}
              id="to"
              aria-invalid={!!errors.to}
              disabled={isLoading}
            >
              {all.map(currency => (
                <option
                  key={currency}
                  value={currency}
                  disabled={fromCurrency === currency}
                >
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.converterInputWrapper}>
            {errors?.amount && <Error message={errors.amount.message} />}
            <Label htmlFor="amount">Сумма</Label>
            <Input
              {...register('amount', {
                required: { value: true, message: 'Обязательное поле' },
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: 'Только числа (целые или дробные)',
                },
                validate: {
                  positiveNumber: value => +value > 0 || 'Больше нуля',
                },
              })}
              variant="compact"
              type="number"
              id="amount"
              aria-invalid={!!errors.amount}
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="small"
          type="submit"
          aria-label="Обменять"
          disabled={isLoading}
        >
          Обменять
        </Button>
      </form>
    </div>
  );
};
