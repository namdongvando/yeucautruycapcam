import { connect } from 'react-redux';
import React, { Component, useReducer, useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';
import { InputField } from 'components/FormFields';
import { Box } from '@mui/system';
import CheckboxField from 'components/FormFields/CheckboxField';
import { useForm } from 'react-hook-form';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { RestpasswordPayload } from 'models/RestpasswordPayload';

export default function ProfilePage() {
  const handleSubmit = async (formValues: RestpasswordPayload) => {
    console.log(formValues);
  };
  const initialValues: RestpasswordPayload = {
    password: '',
    newpassword: '',
    repassword: '',
  } as RestpasswordPayload;
  return (
    <Box maxWidth={400}>
      <ResetPasswordForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Box>
  );
}
