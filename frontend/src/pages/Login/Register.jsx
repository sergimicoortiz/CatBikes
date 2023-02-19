import React from "react";
import LoginRegisterForm from "../../components/LoginRegister/LoginRegisterForm";
import { useUser } from "../../hooks/useUser";
const Register = () => {
    const { useRegister, errorsUser } = useUser();
    return (
        <div>
            <h1>REGISTER</h1>
            <LoginRegisterForm sendData={(data) => useRegister(data)} errorsUser={errorsUser} />
        </div>
    );
};

export default Register;