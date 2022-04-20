export interface Examinations {
    id: string;
    code: string;
    yeuCauTruyXuat: string;
    donViYeuCau: string;
    thoiGianYeuCau: Date;
    mucDich: string;
    username: string;
    viTriCanTruyXuat: string;
    trangThai: number;
    thoiGianCanTruyXuat: Date;
}
export interface OptionsYeuCau {
    id: string;
    code: string;
    name: string;
    groups: string;
}
export interface ExaminationXuLy {
    id: string;
    dapUngYeuCau: string;
    noiDungDapUng: string;
    lyDoKhongDapUng: string;
}

export interface ExaminationsRequest {
    keyword: string;
    pageIndex: number;
    pagesNumber: number;
}


