export interface ResultPaging {
    data: any[];
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalSize: number;
}

export interface ResultData {
    errorMessage?: any;
    data: any[];
    succeed: boolean;
    responseFailed?: any;
}