import { Controller, useForm } from "react-hook-form"
import FormElement from "../Components/FormElement";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate();

  const registerUser = async (data) => {
    try {
      const api = "https://buddyup.azurewebsites.net/api/auth/register";
      const response = await axios.post(api, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        }
      });

      sessionStorage.setItem("token", response.data.token);

      if (response.status === 200) {
        toast.success(
          "¡Tu cuenta se creó correctamente. A continuación completa tus preferencias.! ",
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

      navigate("/preferences");
      window.location.reload(false);
    } catch (error) {
      toast.error(
        "¡Ocurrió un error! ",
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
    }
  }

  return (
    <>
      <div className="bg-main_color min-h-screen flex flex-col justify-center">
        <div className="xs:p-0 mx-auto md:w-full md:max-w-[390px]">
          <h1 className="font-nunito font-bold text-center text-2xl mb-5 text-[#2f2f2f]">Crea tu cuenta</h1>
          <p className="font-nunitosans text-center text-sm w-[358px] mx-auto mb-6">
            Conecta con quien tu quieras, aprende y comparte experiencias y habilidades.
          </p>
          <form onSubmit={handleSubmit(registerUser)} className="w-[358px] mx-auto divide-y divide-gray-200">
            <div className="mt-6">
              <Controller
                name="fullName"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type="text"
                    label="Nombre completo"
                    placeholder="Nombres y Apellidos"
                    fieldref={field}
                    hasError={errors.fullName?.type === "required"}
                  />
                )}
              />
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
                    label="Password"
                    fieldref={field}
                    hasError={errors.password?.type === "required"}
                  />
                )}
              />
              <button type="submit" className="transition duration-200 bg-accent2 text-black h-12 w-full p-4 mt-4 rounded-2xl text-xs shadow-sm hover:shadow-md font-nunitosans text-center font-bold inline-block">
                <span>Continuar</span>
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

export default Register;