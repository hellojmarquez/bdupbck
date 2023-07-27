import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import FormElement from "../Components/FormElement";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { control, handleSubmit, formState: { errors, isLoading } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const navigate = useNavigate();

  const loginUser = async (data) => {
    try {
      const api = "https://buddyup.azurewebsites.net/api/auth/login";
      const response = await axios.post(api, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      });

      if (response.status === 200) {
        toast.success(
          "¡Bienvenido! ",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/swipe");
        window.location.reload(false);
      };

    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        toast.error(
          "¡Datos de acceso incorrectos! ",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      };
    }
  }
  return (
    <>
      <div className="bg-main_color min-h-screen flex flex-col justify-center">
        <div className="xs:p-0 mx-auto md:w-full md:max-w-[390px]">
          <h1 className="font-nunito font-bold text-center text-2xl mb-2">Inicia Sesión</h1>
          <p className="font-nunitosans text-center text-sm w-[358px] mx-auto mb-6">
            Conecta con quien tu quieras, aprende y comparte experiencias y habilidades.
          </p>
          <form onSubmit={handleSubmit(loginUser)} className="w-[358px] mx-auto divide-y divide-gray-200">
            <div className="mt-6">
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type="email"
                    label="Correo electrónico"
                    placeholder="Ejemplo@gmail.com"
                    fieldref={field}
                    hasError={errors.email?.type === "required"}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type="password"
                    label="Contraseña"
                    fieldref={field}
                    hasError={errors.password?.type === "required"}
                  />
                )}
              />
              <p className="font-nunitosans text-xs mb-4">¿Se te olvidó tu contraseña?</p>
              <button type="submit" className="transition duration-200 bg-accent2 text-black h-12 w-full p-4 rounded-2xl text-xs shadow-sm hover:shadow-md font-nunitosans text-center font-bold inline-block">
                {
                  isLoading ? <span>Registrandote...</span> : <span>Continuar</span>
                }
              </button>
            </div>
          </form>
          <p className="font-nunitosans text-xs text-center mt-6 text-[#2f2f2f]">¿Aún no tienes una cuenta? Inscribirse.</p>
          <p className="font-nunitosans text-xs text-center text-[#2f2f2f]">Al continuar, reconoce y acepta nuestra Política de privacidad y Términos de uso.</p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Login;