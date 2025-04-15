import { useForm } from 'react-hook-form';

import { ITransactionForm } from '@/types';
import { Button } from '@/ui/Button';
import { Error } from '@/ui/Error';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

import styles from './TransactionForm.module.css';

interface Props {
  loading: boolean | null;
  onSubmit: (data: ITransactionForm) => void;
}

export const TransactionForm = ({ loading, onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ITransactionForm>({
    mode: 'onBlur',
  });

  return (
    <div className={styles.transaction}>
      <Heading level="h3" size="sizeMedium" marginBottom="mbMedium">
        Перевод
      </Heading>

      <form
        className={styles.transactionForm}
        onSubmit={handleSubmit(data => {
          onSubmit(data);
          reset();
        })}
      >
        <div className={styles.transactionFormInputWrapper}>
          {errors?.account && <Error message={errors.account.message} />}
          <Label htmlFor="account">Счет</Label>
          <Input
            {...register('account', {
              required: { value: true, message: 'Обязательное поле' },
              pattern: {
                value: /^\d+$/,
                message: 'Только числа',
              },
            })}
            type="number"
            id="account"
            aria-invalid={!!errors.account}
            disabled={!!loading}
          />
        </div>

        <div className={styles.transactionFormInputWrapper}>
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
            type="number"
            step="any"
            id="amount"
            aria-invalid={!!errors.amount}
            disabled={!!loading}
          />
        </div>

        <Button
          variant="primary"
          size="large"
          fullWidth={true}
          type="submit"
          aria-label="Перевести сумму денег"
          disabled={!!loading}
        >
          Перевести
        </Button>
      </form>
    </div>
  );
};
