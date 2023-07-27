import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/system';
import Slider, { sliderClasses } from '@mui/base/Slider';
import { BsCheck2 } from 'react-icons/bs';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { v4 as uuidv4 } from 'uuid';
import female from "../images/female.svg";
import male from "../images/male.svg";
import other from "../images/other.svg";
import categoryDeporte from "../images/category-deportes.png";
import categoryCocina from "../images/category-cocina.png";
import categoryIdiomas from "../images/category-idiomas.png";
import categoryMusica from "../images/category-musica.png";
import categoryOtros from "../images/category-otros.png";
import ubication from "../images/ubication.png";
import finalStep from "../images/final-step.png";
import ellipse1 from "../images/ellipse-1.png";
import ellipse2 from "../images/ellipse-2.png";
import ellipse3 from "../images/ellipse-3.png";
import { useNavigate } from "react-router";
import axios from "axios";

const categories = [
  { id: "deporte", src: `${categoryDeporte}` },
  { id: "cocina", src: `${categoryCocina}` },
  { id: "musica", src: `${categoryIdiomas}` },
  { id: "idioma", src: `${categoryMusica}` },
  { id: "otros", src: `${categoryOtros}` },
];

const otherCategories = [
  { id: "ciencias", label: "Ciencias" },
  { id: "matematicas", label: "Matemáticas" },
  { id: "dieta", label: "Dieta" },
  { id: "anime", label: "Anime" },
  { id: "arte", label: "Arte" },
  { id: "tecnologia", label: "Tecnología" },
  { id: "cine", label: "Cine" },
];

function getSteps() {
  return [
    "Nombre",
    "Fecha de nacimiento",
    "Género",
    "Pictures",
    "Preferences",
    "Detail Preferences",
    "Ubication",
    "Distance Preference"
  ];
}

const Preferences = () => {
  const [token, setToken] = useState("");
  const { methods, register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState({
    name: "",
    date: "",
    genero: "",
    preferences: [],
    detailPreferences: "",
    distancePreference: "50"
  });
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, [token]);

  const steps = getSteps();

  const captureInputs = (e) => {
    if (e.target.name === "preferences") {
      let copy = { ...data }

      if (e.target.checked) {
        copy.preferences.push(e.target.value)
      } else {
        copy.preferences = copy.preferences.filter(el => el !== e.target.value);
      }

      setData(copy);
    } else {
      setData(() => ({
        ...data,
        [e.target.name]: e.target.value
      }));
    }
  }

  // const isStepOptional = (step) => {
  //   return step === 1 || step === 2;
  //   return step === 9;
  // };

  const isStepFalied = () => {
    return Boolean(Object.keys(errors).length);
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = async () => {
    // console.log(data);
    // console.log("files: ", files);
    // console.log("images: ", images);
    if (activeStep == 6) {
      // si el navegador soporta geolocalizacion
      if (navigator.geolocation) {
        // pedimos los datos de geolocalizacion al navegador
        navigator.geolocation.getCurrentPosition(
          function (positionUser) {
            setPosition({ Latitude: positionUser.coords.latitude, Longitude: positionUser.coords.longitude })
          })
      }
    }

    if (activeStep == steps.length - 1) {
      const api = "https://buddyup.azurewebsites.net/api/account";
      const headerConfig = {
        headers: {
          "Authorization": "Bearer " + JSON.parse(token),
          "Content-Type": "application/json",
        }
      }

      const getTagId = (tag) => {
        switch (tag) {
          case "ciencias":
            return 2
          case "deporte":
            return 4
          case "dieta":
            return 6
          case "anime":
            return 7
          case "arte":
            return 8
          case "cocina":
            return 12
          case "idioma":
            return 13
          case "cine":
            return 14
          case "otros":
            return 16
          case "matematicas":
            return 5
          case "tecnologia":
            return 10
          case "musica":
            return 11
        }
      }

      const arrayTags = data.preferences.map(preference => { return { id: getTagId(preference), name: preference } });

      const requests = [
        axios.put(`${api}/name`, { description: data.name }, headerConfig),
        axios.put(`${api}/b-day`, { birthday: data.date }, headerConfig),
        axios.put(`${api}/gender`, { description: data.genero }, headerConfig),
        axios.put(`${api}/tag`, JSON.stringify(arrayTags), headerConfig),
        axios.put(`${api}/quote`, { description: data.detailPreferences }, headerConfig),
        axios.put(`${api}/pref-distance`, JSON.stringify({
          minimum: 1,
          maximum: Number(data.distancePreference)
        }), headerConfig),
        axios.put(`${api}/location`, position, headerConfig)
      ]

      Promise.all([
        requests
      ])
        .then(responses => {
          console.log(responses);
          setActiveStep(activeStep + 1);
          return values
        }).catch(err => {
          console.log(err);
        })
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepSkipped(activeStep)) {
  //     setSkippedSteps([...skippedSteps, activeStep]);
  //   }
  //   setActiveStep(activeStep + 1);
  // };

  async function uploadimg(e) {
    const file = e.target.files[0];
    if (file) {
      // console.log("e---image", files, images);

      setImages([...images, (await readFileAsync(file))]);
      setFiles([...files, file]);
    }
  }

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          id: uuidv4(),
          url: reader.result,
          type: "image"
        });
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  function deleteFile(id) {
    const imageIndex = images.findIndex(item => item.id === id);

    if (imageIndex > -1) {
      setImages(images.filter(item => item.id !== id));
      setFiles(files.filter((_, i) => i !== imageIndex));
    }
  }

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#BF9CFA',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#BF9CFA',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#c6c6c6',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#c6c6c6',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#BF9CFA',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#BF9CFA',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <BsCheck2 className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  return (
    <div className="relative bg-main_color min-h-screen">
      <div className="absolute top-0 left-0 w-[167px] xl:w-[350px]">
        <img src={ellipse1} alt="" />
      </div>
      <div className="absolute top-0 left-[100%] -translate-x-[100%] w-[167px] xl:w-[400px]">
        <img src={ellipse2} alt="" />
      </div>
      <div className="h-12 px-4 py-2 xl:py-4 xl:h-14 mb-10 flex justify-start items-center">
        {activeStep !== 0 && activeStep !== 8
          ? <MdOutlineArrowBackIos onClick={handleBack} style={{ width: "32px", height: "32px", position: "absolute", zIndex: "9" }} />
          : null
        }
      </div>
      <div className="xl:w-[200px] xl:mx-auto">
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography
            //       variant="caption"
            //       align="center"
            //       style={{ display: "block" }}
            //     >
            //       optional
            //     </Typography>
            //   );
            // }
            if (isStepFalied() && activeStep == index) {
              labelProps.error = true;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step {...stepProps} key={index}>
                <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}></StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      {activeStep === steps.length ? (
        <>
          <div className="h-screen flex flex-col items-center justify-center text-center mx-4 xl:w-[405px]  xl:mx-auto">
            <img className="mx-auto" src={finalStep} alt="" />
            <h2 className="font-nunito font-semibold text-4xl text-[#2f2f2f] mt-2 xl:text-3xl xl:px-10">Al final gana quien es más amable</h2>
            <p className="font-nunitosans text-sm text-[#2f2f2f] mt-2 mb-8 xl:text-base xl:px-2">Estás a un paso de empezar a usar nuestra app BuddyUp, aquí encontrarás una comunidad amigable y enriquecedora, donde el respeto y la amabilidad son fundamentales. Aprende y crece junto a personas con intereses similares. ¡Conecta, aprende y crece con nosotros!</p>
            <button
              className="w-[358px] cursor-pointer transition duration-200 bg-accent2 text-black py-2.5 mx-auto mt-4 rounded-2xl text-sm shadow-sm hover:shadow-md text-center inline-block text-base font-bold h-12 text-[24px]"
              type="button"
              onClick={() => navigate("/swipe")}
            >
              Comenzar
            </button>
          </div>
        </>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleNext)} className="flex flex-col justify-between w-[358px] xl:min-w-[408px] mx-auto mt-[42px] pb-8 xl:pb-[124px] xl:mx-auto bg-main_color">
              <div className="w-full mx-auto flex flex-col justify-center items-center">
                {
                  activeStep == 0 &&
                  (<>
                    <h2 className="font-nunito text-2xl text-black font-bold xl:text-3xl z-10">¿Cómo es tu nombre?</h2>
                    <p className="w-[358px] xl:w-[408px] font-nunitosans font-semibold text-sm text-black my-4 xl:mt-[18px] xl:mb-6 text-center xl:text-base">Asi es como se va a ver en tu perfil, pero recuerda que<br /> no podrás cambiarlo más adelante. ¡Eligesa biamente! 😉</p>
                    <div className="mb-[455px] xl:mb-[433px]">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        onChange={captureInputs}
                        value={data.name}
                        className="w-[358px] py-2.5 px-4 border border-solid border-[#c6c6c6] rounded-2xl"
                        placeholder="Ingresa tu nombre"
                      />
                      {errors.name?.type === "required" && <p className="mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">El nombre es obligatorio</p>}
                    </div>
                  </>)
                }
                {
                  activeStep == 1 &&
                  (<>
                    <h2 className="font-nunito text-2xl text-black font-bold xl:text-3xl z-10">¿Cuándo es tu cumpleaños?</h2>
                    <p className="font-nunitosans text-sm text-black my-4 text-start xl:mt-[18px] xl:mb-6 xl:text-base">Tus posibles amigos solo verán tu edad, no tu fecha de nacimiento.</p>
                    <div className="w-full flex flex-col justify-center mb-[459px] xl:mb-[437px]">
                      <input
                        {...register("date", { required: true })}
                        type="date"
                        name="date"
                        onChange={captureInputs}
                        value={data.date}
                        className="w-[193px] h-10 px-4 py-2 mx-auto text-base rounded-2xl text-2xl"
                      />
                      {errors.date?.type === "required" && <p className="w-full mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">La fecha de nacimiento es obligatoria</p>}
                    </div>
                  </>)
                }
                {
                  activeStep == 2 &&
                  (<>
                    <h2 className="font-nunito font-bold text-2xl mb-4 xl:text-3xl xl:w-[449px] z-10">¿Con que género te indentificas?</h2>
                    <div className="flex flex-col justify-between xl:mt-6 mb-[412px] xl:mb-[426px] xl:w-[408px]">
                      <div className="flex gap-4">
                        <div className="cursor-pointer flex flex-col items-center gap-2 rounded-2xl border border-solid border-[#c6c6c6] p-4 w-[108px]">
                          <img className="w-[40px] h-[40px]" src={female} alt="female icon" />
                          <label className="font-nunitosans text-black text-sm" htmlFor="masculino">
                            <input className="hidden" type="radio" id="masculino" value="masculino" {...register("genero", { required: true })} onChange={captureInputs} />
                            Masculino
                          </label>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center gap-2 rounded-2xl border border-solid border-[#c6c6c6] p-4 w-[108px]">
                          <img className="w-[40px] h-[40px]" src={male} alt="male icon" />
                          <label className="font-nunitosans text-black text-sm" htmlFor="femenino">
                            <input className="hidden" type="radio" id="femenino" value="femenino" {...register("genero", { required: true })} onChange={captureInputs} />
                            Femenino
                          </label>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center gap-2 rounded-2xl border border-solid border-[#c6c6c6] p-4 w-[108px]">
                          <img className="w-[40px] h-[40px]" src={other} alt="other icon" />
                          <label className="font-nunitosans text-black text-sm" htmlFor="otro">
                            <input className="hidden" type="radio" id="otro" value="otro" {...register("genero", { required: true })} onChange={captureInputs} />
                            Otro
                          </label>
                        </div>
                      </div>
                      {errors.genero?.type === "required" && <p className="w-full mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">El género es obligatorio</p>}
                    </div>
                  </>)
                }
                {activeStep == 3 &&
                  (<div className="flex flex-col items-start h-full">
                    <h2 className="font-nunito font-bold text-2xl xl:text-3xl xl:text-start z-10">Añade tus fotos</h2>
                    <p className="font-nunitosans text-sm text-black my-4 xl:mt-[18px] xl:mb-6 xl:text-base">¡Ponle cara a tu perfil! Agrega una foto y haz que nuevos amigos te reconozcan al instante.</p>
                    <div className="mb-[203px] xl:mb-[124px] h-[264px]">
                      <div className="flex flex-wrap gap-3">
                        <div className={`${files.length >= 6 ? "hidden" : ""}`}>
                          <label
                            htmlFor="button-file"
                            className="relative w-[111px] xl:w-[127px] h-[144px] xl:h-[144px] rounded-2xl border border-solid border-[#c6c6c6] inline-block"
                          >
                            <input
                              {...register("images", { required: true })}
                              accept="image/*"
                              name="images"
                              id="button-file"
                              type="file"
                              onChange={uploadimg}
                              className="absolute -top-[300%] -left-[400%] pointer-events-none"
                              multiple
                            />
                            <div className="w-[30px] h-[30px] absolute top-[100%] left-[100%] -translate-x-[75%] -translate-y-[75%] bg-accent1 text-white rounded-full flex justify-center items-center"><HiOutlinePlus /></div>
                          </label>
                        </div>
                        {images.map((media) => (
                          <div className="relative" key={media.id}>
                            <div
                              role="button"
                              tabIndex={0}
                              className="relative w-[111px] h-[126px] xl:w-[127px] h-[144px] rounded-2xl overflow-hidden border border-solid border-[#c6c6c6] inline-block"
                            >
                              <img
                                className="w-full h-full object-cover"
                                src={media.url}
                                alt="image user"
                              />
                            </div>
                            <div className="w-[30px] h-[30px] absolute top-[100%] left-[100%] -translate-x-[75%] -translate-y-[75%] bg-black text-white rounded-full flex justify-center items-center" onClick={() => deleteFile(media.id)}><VscChromeClose /></div>
                          </div>
                        ))}
                      </div>
                      {errors.images?.type === "required" && <p className="w-full mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">Debes subir al menos una imagen.</p>}
                    </div>
                  </div>)
                }
                {activeStep == 4 &&
                  (<div className="relative">
                    <h2 className="font-nunito font-bold text-2xl xl:text-3xl z-10">Tus pasatiempos</h2>
                    <p className="font-nunitosans text-sm text-black my-4 xl:mt-[18px] xl:mb-6 xl:text-base">Selecciona tu favorito para encontrar amigos con intereses similares.</p>
                    <div className="flex flex-wrap gap-4 my-4 xl:w-[545px] xl:mt-[13px] xl:mb-[18px] mx-auto">
                      {categories?.map(category => (
                        <div key={category.id}>
                          <label htmlFor={category.id}>
                            <img className="w-[171px] h-[124px] rounded-2xl overflow-hidden" src={category.src} alt={`image ${category.id}`} />
                            <input
                              {...register("preferences", { required: true })}
                              onChange={captureInputs}
                              type="checkbox"
                              name="preferences"
                              value={category.id}
                              id={category.id}
                              className="absolute -top-[100%] -left-[100%] pointer-events-none"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    <h2 className="font-nunito font-bold text-2xl z-10">Otros intereses</h2>
                    <div className="xl:mb-[78px]">
                      <div className="flex flex-wrap gap-4 my-4 xl:w-[586px]">
                        {otherCategories?.map(category => (
                          <div key={category.id}>
                            <label htmlFor={category.id} className="font-nunitosans text-black text-sm px-2 py-1 border border-solid border-[#c6c6c6] rounded-lg">
                              <input
                                {...register("preferences")}
                                onChange={captureInputs}
                                type="checkbox"
                                name="preferences"
                                value={category.id}
                                id={category.id}
                                className="absolute -top-[100%] -left-[100%] pointer-events-none"
                              />
                              <span>{category.label}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors.preferences?.type === "required" && <p className="w-full mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">Las categorias son obligatorias.</p>}
                    </div>
                  </div>)
                }
                {
                  activeStep == 5 &&
                  (<>
                    <div className="w-full flex justify-start">
                      <h2 className="text-2xl text-black font-bold mb-4 xl:text-3xl z-10">¡Nos encanta el<br /> interés que elegiste!</h2>
                    </div>
                    <div className="w-full mb-[391px] xl:mb-[332px] xl:mt-4">
                      <textarea style={{ resize: "none" }} {...register("detailPreferences", { required: true })}
                        onChange={captureInputs}
                        value={data.detailPreferences}
                        placeholder="Describe de manera breve en qué consiste o qué es lo que te gusta hacer específicamente."
                        className="w-full h-[100px] py-2.5 px-4 rounded-lg border border-solid border-[#c6c6c6] :placeholder:text-sm :placeholder:font-nunitosans font-nunitosans text-sm"
                      >
                      </textarea>
                      {errors.detailPreferences?.type === "required" && <p className="w-full mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">Este campo es obligatorio.</p>}
                    </div>
                  </>)
                }
                {
                  activeStep == 6 &&
                  (<>
                    <h2 className="text-2xl text-black font-bold mb-4 text-center xl:text-3xl">¿Dónde estás?</h2>
                    <p className="font-nunitosans text-sm text-black my-4 text-center xl:text-base">Para encontrar las mejores coincidencias para ti, necesitamos acceder a tu ubicación. ¡No te preocupes, es completamente seguro y confidencial! </p>
                    <div className="w-[358px] mb-[70px]">
                      <img className="w-full" src={ubication} alt="ubication image" />
                    </div>
                  </>)
                }
                {
                  activeStep == 7 &&
                  (<>
                    <h2 className="font-nunito font-bold text-2xl mb-4 text-center xl:text-3xl z-10">¿Tus preferencias de<br /> distancia?</h2>
                    <p className="mb-[59px] text-sm xl:text-base">De esta manera, podremos conectarte con personas que compartan tu misma pasión y vivan cerca de ti.</p>
                    <div className="w-full text-accent1 mb-[309px] xl:mb-[312px]">
                      <input
                        {...register("distancePreference", { required: true })} type="range"
                        id="tempB"
                        name="distancePreference"
                        list="values"
                        onChange={captureInputs}
                        className="w-full cursor-pointer rounded-lg xl:w-[408px]"
                        step={5}
                        min={0}
                        max={50}
                        value={data.distancePreference}
                      />
                      <datalist className="font-nunitosans text-2xl font-bold flex justify-between w-full text-black" id="values">
                        <option className="p-0" value="0" label="0 km"></option>
                        <option className="p-0" value="10" label=""></option>
                        <option className="p-0" value="20" label=""></option>
                        <option className="p-0" value="30" label=""></option>
                        <option className="p-0" value="40" label=""></option>
                        <option className="p-0" value="50" label="50 km"></option>
                      </datalist>
                    </div>
                    {errors.distancePreference?.type === "required" && <p className="w-full mt-2 p-3 rounded-xl font-bold text-sm bg-red-100 text-error">La distancia es obligatoria</p>}
                  </>)
                }
                {/* <div className="w-full min-h-full p-4 inline-block"> */}
                {/* {isStepOptional(activeStep) && (
                  <button onClick={handleSkip}
                    className="transition duration-200 bg-accent2 text-black py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block text-base font-bold h-12 w-full"
                    type="submit"
                  >
                    skip
                  </button>
                )} */}
              </div>
              <button
                className="w-full xl:w-[358px] cursor-pointer transition duration-200 bg-accent2 text-black py-2.5 mx-auto mt-4 rounded-2xl text-sm shadow-sm hover:shadow-md text-center inline-block text-base font-bold h-12 self-end xl:text-[24px]"
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finalizar" : activeStep === 6 ? "Permitir y continuar" : "Continuar"}
              </button>
            </form>
          </FormProvider>
        </>
      )
      }
    </div >
  );
};

export default Preferences;