import { yupResolver } from '@hookform/resolvers/yup';
import { yearPickerClasses } from '@mui/lab';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { RestpasswordPayload } from 'models';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export interface ResetPasswordFormProps {
  initialValues?: RestpasswordPayload;
  onSubmit?: (formValues: RestpasswordPayload) => void;
}
const schema = yup.object().shape({
  newpassword: yup.string().required('Vui lòng nhập mật khẩu mới'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  repassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
});
export default function ResetPasswordForm({ initialValues, onSubmit }: ResetPasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RestpasswordPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: RestpasswordPayload) => {
    onSubmit?.(formValues);
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="password" control={control} label="Mật khẩu" type="password" />
        <InputField
          name="newpassword"
          control={control}
          label="Nhập lại mật khẩu"
          type="password"
        />
        <InputField name="repassword" control={control} label="mật khẩu mới" type="password" />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            {!isSubmitting && 'Lưu'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
