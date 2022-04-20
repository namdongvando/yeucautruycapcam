import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { InputField, SelectField } from 'components/FormFields';
import DateField from 'components/FormFields/DateField';
import { Examinations } from 'models';
import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrangThaiOptions } from 'utils/constants';
import * as yup from 'yup';
import FormPost from './FormPost';
export interface YeuCauFormProps {
  initialValues?: Examinations;
  isOpen: boolean;
  onClose: () => void;
  onModelSubmit: (formValues: Examinations) => void;
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
export default function ModalYeucauForm({
  initialValues,
  onClose,
  isOpen,
  onModelSubmit,
}: YeuCauFormProps) {
  const handleFormSubmit = async (formValues: Examinations) => {
    onClose();
    await onModelSubmit(formValues);
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-titleput"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-titleput" variant="h6" component="h2">
          Cập nhật yêu cầu
        </Typography>
        <FormPost onSubmit={handleFormSubmit} formInitialValues={initialValues}></FormPost>
      </Box>
    </Modal>
  );
}
