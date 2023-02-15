import api from "./api.js";

export const getUser = (token) => {
    return api(token).get("user");
}