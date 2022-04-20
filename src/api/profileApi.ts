
import { ListResponse } from "models";
import { ProfilePayload } from "models/profilePayload";
import { ServiceForm } from "models";
import { apiLinks } from "utils";
import axiosClient from "./axiosClient";
import { UserInfor } from "models/userinfor";

export const profileApi = {
    post(payload: ProfilePayload): Promise<UserInfor> {
        return axiosClient.post(apiLinks.auth.login, payload);
    },
    get(): Promise<ServiceForm[]> {
        return axiosClient.get(apiLinks.serviceForm.get);
    }
}