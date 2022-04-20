import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField, SelectOption } from 'components/FormFields';
import DateTimeField from 'components/FormFields/DateTimeField';
import { Examinations, ExaminationXuLy, OptionsYeuCau } from 'models';
import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrangThaiOptions } from 'utils/constants';
import * as yup from 'yup';
import Moment from 'react-moment';
import { DapUngYeuCau } from 'constants/Common';

const style = {
  position: 'absolute' as 'absolute',
  top: '25%',
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
  dapUngYeuCau: yup.string().required('Vui lòng chọn loại xử lý'),
  // noiDungDapUng: yup.string().required('Vui lòng nội dung đáp ứng'),
  // lyDoKhongDapUng: yup.string().required('Vui lòng chọn lý do không đáp ứng'),
});
export interface FormPostProps {
  formInitialValues?: Examinations;
  yeucauForm?: ExaminationXuLy;
  onSubmit: (formValues: ExaminationXuLy) => void;
}
export default function FormXuLy({ formInitialValues, yeucauForm, onSubmit }: FormPostProps) {
  const { control, handleSubmit, register, watch } = useForm<ExaminationXuLy>({
    defaultValues: yeucauForm,
    resolver: yupResolver(schema),
  });
  //
  const [yeuCauDetail, setYeuCauDetail] = useState(formInitialValues);

  const watchAllFields = watch();
  const DSDonVi = useAppSelector((state) => state.yeucau.DSDonVi);
  const DSDapUng = useAppSelector((state) => state.yeucau.DSDapUng);
  const DSLyDo = useAppSelector((state) => state.yeucau.DSLyDo);
  const OptionsDonVi: SelectOption[] = [];
  const OptionsDapUng: SelectOption[] = [];
  const OptionsLyDo: SelectOption[] = [];
  DSDonVi.map((item, index) => {
    OptionsDonVi.push({
      value: item.code,
      label: item.name,
    });
  });
  DSLyDo.map((item, index) => {
    OptionsLyDo.push({
      value: item.code,
      label: item.name,
    });
  });
  DSDapUng.map((item, index) => {
    OptionsDapUng.push({
      value: item.code,
      label: item.name,
    });
  });

  const [modelDapUngYeuCau, SetDapUngYeuCauChange] = useState(DapUngYeuCau.TXD);
  const handleFormSubmit = (formValues: ExaminationXuLy) => {
    // if (formValues.dapUngYeuCau == DapUngYeuCau.TXD) {
    // }
    onSubmit(formValues);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box>
          <p>
            Mã yêu cầu: <strong>{yeuCauDetail?.code}</strong>{' '}
          </p>
          <p>
            Nội dung yêu cầu: <strong>{yeuCauDetail?.yeuCauTruyXuat}</strong>{' '}
          </p>
          <p>
            Mã yêu cầu: <strong>{yeuCauDetail?.donViYeuCau}</strong>
          </p>
          <p>
            Mục đích: <strong>{yeuCauDetail?.mucDich}</strong>
          </p>
          <p>
            Vị trí: <strong>{yeuCauDetail?.viTriCanTruyXuat}</strong>
          </p>
          <p>
            Thời gian cần truy xuất:
            <b>
              <Moment format="hh:mm DD/MM/YYYY">{yeuCauDetail?.thoiGianCanTruyXuat}</Moment>
            </b>
          </p>
          <SelectField control={control} name="dapUngYeuCau" options={OptionsDapUng}></SelectField>
          {watchAllFields.dapUngYeuCau == DapUngYeuCau.TXD && (
            <InputField
              name="noiDungDapUng"
              control={control}
              rows={4}
              label="Nội dung đáp ứng yêu cầu"
              type="text"
            />
          )}
          {watchAllFields.dapUngYeuCau == DapUngYeuCau.KTXD && (
            <SelectField
              label="Lý do không đáp ứng được"
              control={control}
              name="lyDoKhongDapUng"
              options={OptionsLyDo}></SelectField>
          )}
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </Box>
      </form>
    </>
  );
}
