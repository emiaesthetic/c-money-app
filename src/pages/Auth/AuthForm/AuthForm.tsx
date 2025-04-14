import { useForm } from 'react-hook-form';

import { IFormData } from '@/types';
import { Button } from '@/ui/Button';
import { Error } from '@/ui/Error';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

import styles from './AuthForm.module.css';

interface Props {
  loading: boolean | null;
  onSubmit: (data: IFormData) => void;
}

export const AuthForm = ({ loading, onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>({
    mode: 'onBlur',
  });

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <Heading marginBottom="mbSmall" center={true}>
        Вход в аккаунт
      </Heading>

      <div className={styles.authInputWrapper}>
        {errors?.username && <Error message={errors.username.message} />}
        <Label htmlFor="username">Логин</Label>
        <Input
          {...register('username', {
            required: { value: true, message: 'Обязательное поле' },
            pattern: {
              value: /^[a-zA-Z]{6,}$/,
              message: 'Минимум 6 символов (латиница)',
            },
          })}
          type="text"
          id="username"
          aria-invalid={!!errors.username}
          disabled={!!loading}
        />
      </div>

      <div className={styles.authInputWrapper}>
        {errors?.password && <Error message={errors.password.message} />}
        <Label htmlFor="password">Пароль</Label>
        <Input
          {...register('password', {
            required: { value: true, message: 'Обязательное поле' },
            pattern: {
              value: /^[a-zA-Z\d]{6,}$/,
              message: 'Минимум 6 символов (латиница и цифры)',
            },
          })}
          type="password"
          id="password"
          aria-invalid={!!errors.password}
          disabled={!!loading}
        />
      </div>

      <Button
        variant="primary"
        size="large"
        fullWidth={true}
        type="submit"
        aria-label="Войти в аккаунт"
        disabled={!!loading}
      >
        Войти
      </Button>
    </form>
  );
};
