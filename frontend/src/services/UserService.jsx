import Api from "./Api";

const UserService = {
    Login(data) {
        return Api().post("login", data);
    },

    Register(data) {
        return Api().post("register", data);
    },

    GetUser() {
        return Api().get("user");
    },

    Logout() {
        return Api().post("logout");
    },

    RefreshToken() {
        Api().post("logout");
        return Api().post("refreshToken");
    },
};

export default UserService;
