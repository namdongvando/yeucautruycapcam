
import { Examinations, ExaminationsRequest, ExaminationXuLy } from "models";
import { ProfilePayload } from "models/profilePayload";
import { ServiceForm } from "models";
import { apiLinks } from "utils";
import axiosClient from "./axiosClient";
import { ResultData } from "models/ResultPaging";
import { DapUngYeuCau } from "constants/Common";

export const yeucauApi = {
    get(payload: ExaminationsRequest): Promise<Examinations[]> {
        var data = {
            params: {
                ...payload
            }
        };
        return axiosClient.get(apiLinks.Examinations.get, data);
    },
    getById(payload: string): Promise<Examinations> {
        return axiosClient.get(`${apiLinks.Examinations.getById}/${payload}`);
    },
    getOptiopsByGroups(payload: string): Promise<ResultData> {
        return axiosClient.get(`${apiLinks.Options.getByGroups}?groups=${payload}`);
    },
    delete(payload: string): Promise<string> {
        var data = {
            data: { id: payload }
        };
        return axiosClient.delete(`${apiLinks.Examinations.delete}`, data);
    },
    Put(payload: Examinations): Promise<Examinations> {
        return axiosClient.put(`${apiLinks.Examinations.put}`, payload);
    },
    PostLyDo(payload: ExaminationXuLy): Promise<ResultData> {
        if (payload.dapUngYeuCau == DapUngYeuCau.KTXD) {
            payload.noiDungDapUng = payload.lyDoKhongDapUng;
        }
        return axiosClient.put(`${apiLinks.Examinations.LyDo}`, payload);
    },
    post(payload: Examinations): Promise<Examinations> {
        return axiosClient.post(`${apiLinks.Examinations.post}`, payload);
    }
}