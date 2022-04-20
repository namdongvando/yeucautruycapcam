import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { InputField, SelectField } from 'components/FormFields';
import DateField from 'components/FormFields/DateField';
import { DapUngYeuCau } from 'constants/Common';
import { Examinations, ExaminationXuLy, OptionsYeuCau } from 'models';
import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrangThaiOptions } from 'utils/constants';
import * as yup from 'yup';
import FormXuLy from '../components/FormXuLy';

export interface YeuCauFormProps {
  initialValues?: Examinations;
  isOpen: boolean;
  onClose: () => void;
  onModelSubmit: (formValues: ExaminationXuLy) => void;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#fff',
  border: '1px solid #aaa',
  boxShadow: 24,
  zIndex: 9999,
  p: 4,
};
export default function ModalXuLyYeucau({
  initialValues,
  onClose,
  isOpen,
  onModelSubmit,
}: YeuCauFormProps) {
  const handleFormSubmit = async (formValues: ExaminationXuLy) => {
    console.log(formValues);
    onClose();
    await onModelSubmit(formValues);
  };

  var yeucauForm: ExaminationXuLy = {
    id: initialValues?.id,
    dapUngYeuCau: '',
    lyDoKhongDapUng: '',
    noiDungDapUng: '',
  } as ExaminationXuLy;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-titleput"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-titleput" variant="h6" component="h2">
          Xử lý yêu cầu
        </Typography>
        <FormXuLy
          yeucauForm={yeucauForm}
          onSubmit={handleFormSubmit}
          formInitialValues={initialValues}></FormXuLy>
      </Box>
    </Modal>
  );
}
