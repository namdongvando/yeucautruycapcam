import { createTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import { useHistory } from 'react-router-dom';
import { examinationsDataPaging, selectExaminationsList, yeucauActions } from '../yeucauSlice';
import { Examinations, ExaminationsRequest, ExaminationXuLy } from 'models';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import Moment from 'react-moment';
import { Pagination } from '@mui/material';

import YeucauFormPost from '../components/YeucauFormPost';
import ModalYeucauForm from '../components/ModalYeucauForm';
import ModalXuLyYeucau from '../modal/ModalXuLyYeucau';

const TinhTrangStatus = (props: any) => {
  switch (props.trangThai) {
    case 1:
      return (
        <span style={{ color: 'greeb' }} className="font-weight-bold">
          Đã xử lý
        </span>
      );
    default:
      return <span style={{ color: 'red' }}>Chưa xử lý</span>;
  }
};

export default function YeucauPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openXuLy, setOpenXuLy] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleXuLyClose = () => setOpenXuLy(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [keyword, setKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pagesNumber, setPagesNumber] = useState(10);
  let [dataDetail, setDataDetail] = useState(undefined);
  const style = {
    position: 'absolute' as 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
  };
  useEffect(() => {
    let params: ExaminationsRequest = {
      keyword: keyword,
      pageIndex: pageIndex,
      pagesNumber: pagesNumber,
    } as ExaminationsRequest;
    dispatch(yeucauActions.get(params));
    dispatch(yeucauActions.getLyDo());
    dispatch(yeucauActions.getDonVi());
  }, [dispatch]);
  const dataPaging = useAppSelector(examinationsDataPaging);
  // console.log('|');
  const rows = dataPaging.data;
  // hứng data
  //const listYeuCau = useAppSelector(selectExaminationsList);

  // console.log(listServicesForm);
  // xóa
  const handleDelete = (formValues: string) => {
    const isDelete = window.confirm('Bạn muốn xóa yêu cầu này?');
    if (isDelete == true) {
      console.log(formValues);
      dispatch(yeucauActions.delete(formValues));
    }
  };

  const handleChange = (event: any, value: number) => {
    let params: ExaminationsRequest = {
      keyword: keyword,
      pageIndex: value - 1,
      pagesNumber: pagesNumber,
    } as ExaminationsRequest;
    dispatch(yeucauActions.get(params));
  };
  const handleSubmit = (formValues: Examinations) => {
    dispatch(yeucauActions.put(formValues));
    handleClose();
  };
  const handlePostSubmit = (formValues: Examinations) => {
    dispatch(yeucauActions.post(formValues));
    handleCloseAdd();
  };
  const handleXuLySubmit = (formXuLy: ExaminationXuLy) => {
    dispatch(yeucauActions.postLyDo(formXuLy));
    handleCloseAdd();
  };
  return (
    <>
      <h3>Danh sách yêu cầu tra cứu</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Đơn vị</TableCell>
              <TableCell>Thời gian tạo yêu cầu </TableCell>
              <TableCell>Thời gian yêu cầu</TableCell>
              <TableCell>Mục đích</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Tình trạng</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  className="text-right"
                  variant="contained"
                  onClick={() => {
                    // put(push(`/yeucau/put/${row.id}`));
                    handleOpenAdd();
                  }}>
                  <AddBoxOutlinedIcon></AddBoxOutlinedIcon>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.code}</TableCell>
                <TableCell component="th" scope="row">
                  {row.yeuCauTruyXuat}
                </TableCell>
                <TableCell>{row.donViYeuCau}</TableCell>
                <TableCell>
                  <Moment format="hh:mm DD/MM/YYYY">{row.thoiGianYeuCau}</Moment>
                </TableCell>
                <TableCell>
                  <Moment format="hh:mm DD/MM/YYYY">{row.thoiGianCanTruyXuat}</Moment>
                </TableCell>
                <TableCell>{row.mucDich}</TableCell>
                <TableCell>{row.viTriCanTruyXuat}</TableCell>
                <TableCell>
                  <TinhTrangStatus trangThai={row.trangThai}></TinhTrangStatus>
                </TableCell>
                <TableCell style={{ minWidth: '150px' }} component="th" scope="row">
                  <Button
                    color="success"
                    onClick={() => {
                      // put(push(`/yeucau/put/${row.id}`));

                      setDataDetail(row);
                      handleOpen();
                    }}>
                    <EditSharpIcon></EditSharpIcon>
                  </Button>
                  <Button
                    color="success"
                    onClick={() => {
                      setDataDetail(row);
                      setOpenXuLy(true);
                    }}>
                    <DisplaySettingsOutlinedIcon></DisplaySettingsOutlinedIcon>
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      handleDelete(row.id);
                    }}>
                    <HighlightOffSharpIcon></HighlightOffSharpIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          onChange={handleChange}
          size="large"
          defaultPage={dataPaging.pageIndex}
          count={dataPaging.totalPage}
          color="primary"
        />
      </TableContainer>

      <ModalXuLyYeucau
        onClose={() => {
          handleXuLyClose();
        }}
        isOpen={openXuLy}
        onModelSubmit={handleXuLySubmit}
        initialValues={dataDetail}></ModalXuLyYeucau>
      <YeucauFormPost
        isOpen={openAdd}
        onClose={() => {
          handleCloseAdd();
        }}
        onSubmit={handlePostSubmit}></YeucauFormPost>
      <ModalYeucauForm
        onClose={() => {
          handleClose();
        }}
        isOpen={open}
        onModelSubmit={handleSubmit}
        initialValues={dataDetail}></ModalYeucauForm>
    </>
  );
}
