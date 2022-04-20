const base_url = `http://localhost:62108/api`;

export const apiLinks = {
    auth: {
        login: `https://user-management.bakco.vn/api/Users/Login`,
        signUp: `https://user-management.bakco.vn/api/Users`
    },
    task: {
        get: `${base_url}/Tasks`
    },
    taskStatus: {
        get: `${base_url}/TaskStatus`
    }
}