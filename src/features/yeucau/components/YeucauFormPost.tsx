import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import DateField from 'components/FormFields/DateField';
import DateTimeField from 'components/FormFields/DateTimeField';
import { Examinations } from 'models';
import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrangThaiOptions } from 'utils/constants';
import * as yup from 'yup';
export interface YeuCauFormProps {
  initialValues?: Examinations;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formValues: Examinations) => void;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#fff',
  border: '0px solid #000',
  boxShadow: 24,
  zIndex: 9999,
  p: 1,
};
const schema = yup.object().shape({
  yeuCauTruyXuat: yup.string().required('Vui lòng nhập mật khẩu'),
  thoiGianCanTruyXuat: yup.date().required('Vui lòng thời gian cần truy xuất'),
  donViYeuCau: yup.string().required('Vui lòng nhập đơn vị yêu cầu'),
  viTriCanTruyXuat: yup.string().required('Vui lòng vị trí truy xuất'),
  mucDich: yup.string().required('Vui lòng nhập mục đích truy xuất'),
});

export default function YeucauFormPost({
  initialValues,
  onClose,
  isOpen,
  onSubmit,
}: YeuCauFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Examinations>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const DSDonVi = useAppSelector((state) => state.yeucau.DSDonVi);
  const OptionsDonVi = [
    {
      value: '',
      label: 'Chọn đơn vị',
    },
  ];
  DSDonVi.map(function (item, index) {
    //console.log(item);
    OptionsDonVi.push({
      value: item.code,
      label: item.name,
    });
  });
  const handleFormSubmit = async (formValues: Examinations) => {
    onClose();
    await onSubmit?.(formValues);
  };
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-titlepost">
      <Box sx={style}>
        <Typography id="modal-modal-titlepost" variant="h6" component="h2">
          Tạo mới yêu cầu
        </Typography>
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
            <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
              Tạo Mới
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
