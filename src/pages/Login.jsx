import React, { useState } from "react";
import assets from "../config/img/assets-storage.ts";
import TextField from "@mui/material/TextField";
import IconLook from "../components/icons/Look";
import authService from "../services/auth.service.ts";
import messages from "../utils/messages.ts";

const Login = ({ setLoading, setStateApp }) => {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dataInitApp = {
    user: {},
    message: null,
    token: null,
    isLogged: false,
  };
  const loginUser = async (payload) => {
    try {
      setLoading(true);
      const { data } = await authService.login(payload);
      setStateApp({ ...data, isLogged: true });
      setLoading(false);
    } catch (error) {
      setStateApp(dataInitApp);
      setError(messages[error.response.data.message]);
      setLoading(false);
    }
  };

  const isValidForm = formLogin.username && formLogin.password;

  const styleButtonSubmit = isValidForm
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-gray-300 hover:bg-gray-400";

  return (
    <>
      <div className="flex min-h-full items-center  justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={assets.public.logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-500">
              Iniciar sesión en su cuenta
            </h2>
          </div>
          <div className="mt-8 space-y-3">
            <div className="-space-y-px    ">
              <TextField
                label="Username"
                type="text"
                required
                variant="outlined"
                className="w-full py-2 px-3 "
                name="id"
                value={formLogin.username}
                onChange={({ target }) => {
                  setFormLogin({
                    ...formLogin,
                    username: target.value,
                  });
                  setError("");
                }}
              />
            </div>
            <div className="-space-y-px  ">
              <TextField
                label="Password"
                type="password"
                required
                variant="outlined"
                className="w-full py-2 px-3 "
                name="id"
                value={formLogin.password}
                onChange={({ target }) => {
                  setFormLogin({
                    ...formLogin,
                    password: target.value,
                  });
                  setError("");
                }}
              />
            </div>

            <div>
              <button
                disabled={!isValidForm}
                onClick={() => loginUser(formLogin)}
                className={`${styleButtonSubmit} group  relative mb-10 flex w-full justify-center rounded-md border border-transparent   py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <IconLook handleColorButton />
                </span>
                Iniciar Sesion
              </button>
            </div>
            <div className="text-red-500 font-medium"> {error}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
