const JwtService = {
    destroyToken: () => localStorage.removeItem("token"),

    saveToken: (token) => {
        localStorage.setItem("token", token);
    },

    getToken: () => localStorage.getItem("token"),
};

export default JwtService;
