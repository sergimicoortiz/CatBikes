import React from "react";
import LoginRegisterForm from "../../components/LoginRegister/LoginRegisterForm";
import { useUser } from "../../hooks/useUser";
const Login = () => {
    const { useLogin, errorsUser } = useUser();
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginRegisterForm sendData={(data) => useLogin(data)} errorsUser={errorsUser} />
        </div>
    );
};

export default Login;