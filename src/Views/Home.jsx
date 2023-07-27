import { useNavigate } from "react-router"
import rocket from "../images/rocket.png"
import explosion from "../images/explosion.png"
import explosionYellow from "../images/explosion-yellow.png"
import warmDesktop from "../images/warm-desktop.png"
import { useState } from "react"

const Home = () => {
  const navigate = useNavigate();
  const [showHome, setShowHome] = useState(false);

  setTimeout(() => {
    setShowHome(true);
  }, 3000);

  return (
    <>
      {
        showHome ? (
          <div>
            <div className="overflow-hidden">
              <div className="flex relative">
                <img src={explosion} alt="explosion image" className="object-cover w-[254px] h-[254px] absolute -top-[90px] -left-[23%] -rotate-90 sm:w-[391px] sm:h-[391px] sm:top-['10%'] sm:left-[50%] sm:-translate-x-[90%] sm:-translate-y-[25%]" />
                <img src={explosion} alt="explosion image" className="object-cover w-[391px] h-[391px] absolute -top-[65px] left-[100%] -translate-x-[43%] -translate-y-[25%] -rotate-90 hidden xl:block" />
                <img src={explosion} alt="explosion image" className="object-cover w-[202px] h-[202px] absolute top-[159px] left-0 -translate-x-[50%] hidden xl:block" />
                <img src={explosion} alt="explosion image" className="object-cover w-[202px] h-[202px] absolute top-[405px] right-[50%] translate-x-[150%] bg-fixed" />
                <img src={explosionYellow} alt="explosion image" className="object-cover w-[202px] h-[202px] absolute top-[400px] left-[50%] -translate-x-[200%] bg-fixed" />
                <img src={explosionYellow} alt="explosion image" className="object-cover w-[296px] h-[296px] absolute top-[413px] right-[10%] translate-x-[105%] bg-fixed -rotate-90" />
                <img src={explosionYellow} alt="explosion image" className="object-cover w-[391px] h-[345px] absolute top-[823px] -translate-y-[15%] left-[50%] -translate-x-[200%] bg-fixed rotate-90" />
                <img src={explosionYellow} alt="explosion image" className="object-cover w-[152px] h-[152px] absolute top-[823px] left-[75%] -translate-x-[50%] bg-fixed rotate-180 hidden xl:block" />
              </div>
              <div className="min-h-screen flex flex-col justify-between px-6 relative">
                <div className="h-full text-center">
                  <div className="w-[306px] flex items-center justify-center mt-[221px] mx-auto">
                    <img className="w-full" src={rocket} alt="rocket image" />
                  </div>
                  <h1 className="mt-8 leading-8 font-nunito text-2xl text-[#2f2f2f] font-bold ">Aprende y comparte con<br /> nuevas amistades</h1>
                </div>
                <div className="max-w-[358px] h-full mt-12 mb-8 xl:mb-[138px] mx-auto">
                  <button onClick={() => navigate("/login")} type="button" className="mb-4 transition duration-200 bg-accent2 font-nunitosans text-black w-full h-12 py-4 px-6 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    <span>Iniciar sesión</span>
                  </button>
                  <button onClick={() => navigate("/register")} type="button" className="transition duration-200 border border-solid border-[#c6c6c6] font-nunitosans text-black w-full h-12 py-3 px-8 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    <span>Registrar ahora</span>
                  </button>
                </div>
              </div>
            </div>
          </div >
        ) : (
          <div className="overflow-hidden">
            <div className="w-full min-h-screen bg-accent2 relative">
              <img src={warmDesktop} alt="warm image" className="object-cover w-[500px] absolute -top-[33px] -left-[63px] xl:top-0 xl:left-0 xl:w-[800px]" />
              <img src={warmDesktop} alt="warm image" className="rotate-180 object-cover w-[500px] absolute bottom-0 right-0 xl:w-[800px]" />
            </div>
          </div>
        )
      }
    </>
  )
}
export default Home