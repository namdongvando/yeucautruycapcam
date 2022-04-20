import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import DateTimeField from 'components/FormFields/DateTimeField';
import { Examinations } from 'models';
import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrangThaiOptions } from 'utils/constants';
import * as yup from 'yup';
export interface FormPostProps {
  formInitialValues?: Examinations;
  onSubmit: (formValues: Examinations) => void;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  zIndex: 9999,
  p: 4,
};
const schema = yup.object().shape({
  code: yup.string().required('Vui lòng nhập mật khẩu'),
  yeuCauTruyXuat: yup.string().required('Vui lòng nhập mật khẩu'),
  donViYeuCau: yup.string().required('Vui lòng nhập tên đơn vị'),
});
export default function FormPost({ formInitialValues, onSubmit }: FormPostProps) {
  const { control, handleSubmit } = useForm<Examinations>({
    defaultValues: formInitialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (formValues: Examinations) => {
    console.log(formValues);
    onSubmit(formValues);
  };
  const DSDonVi = useAppSelector((state) => state.yeucau.DSDonVi);
  const OptionsDonVi = [
    {
      value: '',
      label: 'Chọn đơn vị',
    },
  ];
  DSDonVi.map(function (item, index) {
    OptionsDonVi.push({
      value: item.code,
      label: item.name,
    });
  });
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Container>
          <InputField name="yeuCauTruyXuat" control={control} label="Nội dung" type="text" />
          <SelectField
            name="donViYeuCau"
            options={OptionsDonVi}
            control={control}
            label="Đơn vị yêu cầu"></SelectField>
          <InputField name="mucDich" control={control} label="Mục đích" type="text" />
          <InputField
            name="viTriCanTruyXuat"
            control={control}
            label="Vị trí cần truy xuất"
            type="text"
          />
          <Grid container spacing={2} columns={8}>
            <Grid item xs={8}>
              <DateTimeField
                max-date={new Date()}
                name="thoiGianCanTruyXuat"
                control={control}
                label="Thời gian cần truy xuất"
              />
            </Grid>
          </Grid>
        </Container>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </Box>
      </form>
    </>
  );
}
