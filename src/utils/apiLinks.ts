const link_users = `https://smarthatien.bakco.vn/api`;
// const link_users = `https://localhost:44308/api`;
const booking = `https://ht-cam-lookup-api-dev.bakco.vn/api`;
// const booking = `https://localhost:44308`;

export const apiLinks = {
    auth: {
        login: `${link_users}/Auth/Admin/Login`,
        signUp: `${link_users}/Auth/logout`
    },
    serviceForm: {
        get: `https://vientim-schedule.bakco.vn/api/ServiceForms`,
    },
    Examinations: {
        post: `${booking}/Examinations`,
        put: `${booking}/Examinations`,
        get: `${booking}/Examinations`,
        LyDo: `${booking}/Examinations/update/lydo`,
        delete: `${booking}/Examinations`,
        getById: `${booking}/Examinations`

    },
    Options: {
        getByGroups: `${booking}/Options/getbygroups`
    }
}