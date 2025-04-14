import { useForm } from 'react-hook-form';

import { CurrencyBalance, IConverterForm, TCurrency } from '@/types';
import { Button } from '@/ui/Button';
import { Error } from '@/ui/Error';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

import styles from './CurrencyConverter.module.css';

interface Props {
  all: TCurrency[];
  mine: CurrencyBalance[];
  isLoading: boolean;
  onSubmit: (data: IConverterForm) => void;
}

export const CurrencyConverter = ({
  all,
  mine,
  isLoading,
  onSubmit,
}: Props) => {
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
    <div className={styles.currencyConverter}>
      <Heading level="h3" size="sizeSmall" marginBottom="mbSmall">
        Обмен валюты
      </Heading>

      <form
        className={styles.currencyConverterForm}
        onSubmit={handleSubmit(data => {
          onSubmit(data);
          reset();
        })}
      >
        <div className={styles.currencyConverterFormWrapper}>
          <div className={styles.currencyConverterInputWrapper}>
            {errors.from && <Error message={errors.from.message} />}
            <Label htmlFor="from">Откуда</Label>
            <select
              {...register('from', {
                required: 'Выберите валюту',
              })}
              className={styles.currencyConverterSelect}
              id="from"
              aria-invalid={!!errors.from}
              disabled={isLoading}
            >
              <option value="" disabled hidden selected></option>
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

          <div className={styles.currencyConverterInputWrapper}>
            {errors.to && <Error message={errors.to.message} />}
            <Label htmlFor="to">Куда</Label>
            <select
              {...register('to', {
                required: 'Выберите валюту',
              })}
              className={styles.currencyConverterSelect}
              id="to"
              aria-invalid={!!errors.to}
              disabled={isLoading}
            >
              <option value="" disabled hidden selected></option>
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

          <div className={styles.currencyConverterInputWrapper}>
            {errors?.amount && <Error message={errors.amount.message} />}
            <Label htmlFor="amount">Сумма</Label>
            <Input
              {...register('amount', {
                required: { value: true, message: 'Обязательное поле' },
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Только числа',
                },
                validate: {
                  positiveNumber: value => +value > 0 || 'Сумма больше нуля',
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
