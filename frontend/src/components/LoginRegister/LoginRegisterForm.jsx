import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginRegisterForm.scss";

const LoginRegisterForm = ({ sendData, errorsUser }) => {
    const { pathname } = useLocation();
    const path = pathname.split("/")[1];
    const navigate = useNavigate();    
    const passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
    let validators = null;
    if (path === "login") {
        validators = Yup.object().shape({
            username: Yup.string().required("Username is required").min(3).max(15),
            password: Yup.string().required().min(8, "Password must have a least 8 characters"),
        });
    } else {
        validators = Yup.object().shape({
            username: Yup.string().required("Username is required").min(3).max(15),
            password: Yup.string().required().min(8, "password must have a least 8 characters").matches(passwordRegex, "At least one uppercase letter, one lowercase letter, one number and a special character"),
            passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
            email: Yup.string().email().required()
        });
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validators)
    });

    const redirectButton = path === "login"
        ?
        <p className="message">Not registered? <a onClick={() => navigate("/register")}>Create an account</a></p>
        :
        <p className="message">Already registered? <a onClick={() => navigate("/login")}>Sign In</a></p>;


    const emailFrom = path === "register"
        ?
        <div>
            <input type="text" placeholder="Email" name="email" {...register("email")} />
            <div className="error">{errors.email?.message}</div>
        </div>
        : "";

    const repeatPasswordForm = path === "register"
        ?
        <div>
            <input type="password" placeholder="Repeat password" name="passwordConfirmation" {...register("passwordConfirmation")} />
            <div className="error">{errors.passwordConfirmation?.message}</div>
        </div>
        : "";

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit(sendData)}>
                    <input type="text" placeholder="Username" name="username" {...register("username")} />
                    <div className="error">{errors.username?.message}</div>
                    {emailFrom}
                    <input type="password" placeholder="Password" name="password" {...register("password")} />
                    <div className="error">{errors.password?.message}</div>
                    {repeatPasswordForm}
                    <div className="error">{errorsUser}</div>
                    <button>{path}</button>
                    {redirectButton}
                </form>
            </div>
        </div>
    );
};

export default LoginRegisterForm;