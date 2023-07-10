"use client";

import { useState } from "react";

import Image from "next/image";
import Rain from "../public/rain.png";
import Sun from "../public/sun.png";
import Cloud from "../public/cloud.png";
import Mist from "../public/mist.png";
import Drizzle from "../public/drizzle.png";
import Feel from "../public/feel.png";
import Wind from "../public/wind.png";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [errorMsg, setErrorMsg] = useState("Please input city name correctly");
  const [api, setApi] = useState({});

  const API = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const newTemp = Math.round(api.main?.temp);
  const today = new Date();
  const newToday = today.toDateString();

  const getData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
    );
    const result = await response.json();
    console.log(result);
    setApi(result);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      getData();
      setCity("");
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-5 justify-center">
        <input
          placeholder="Search for city"
          value={city}
          type="text"
          onKeyDown={handleInput}
          onChange={(e) => setCity(e.target.value)}
          className="w-[350px] rounded-md h-[50px] text-center text-neutral-700 uppercase md:w-[700px]"
        />
      </div>
      <div className="mt-10 rounded-md">
        {api.cod === "404" && (
          <div className="flex justify-center">{errorMsg}</div>
        )}
        <div className="h-auto text-center">
          {api.name && (
            <div className="text-5xl font-semibold mt-5 uppercase">
              {api.name} , {api.sys.country}
              <div className="text-xl font-light mt-4">{newToday}</div>
            </div>
          )}
          {api.name && api.main?.temp ? (
            <div className="items-center text-center pt-5 flex justify-center flex-col">
              {api.weather[0].main === "Clouds" ? (
                <Image src={Cloud} alt="cloud" className="icon" />
              ) : api.weather[0].main === "Rain" ? (
                <Image src={Rain} alt="rain" className="icon" />
              ) : api.weather[0].main === "Clear" ? (
                <Image src={Sun} alt="clear" className="icon" />
              ) : api.weather[0].main === "Drizzle" ? (
                <Image src={Drizzle} alt="drizzle" className="icon" />
              ) : api.weather[0].main === "Mist" ? (
                <Image src={Mist} alt="mist" className="icon" />
              ) : (
                ""
              )}
              <div className="mt-2">{api.weather[0].description}</div>
              <div className="text-5xl font-bold pt-9">{newTemp} &#8451; </div>
              <div className="w-[400px] mt-5">
                <div className="flex justify-evenly">
                  <div className="flex items-center gap-4">
                    <Image src={Feel} alt="feelsLike" width={40} height={25} />
                    <div className="flex flex-col">
                      <p>Feels like</p>
                      <p>{Math.round(api.main.feels_like)} &#8451;</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Image src={Wind} alt="wind" width={40} height={25} />
                    <div className="flex flex-col">
                      <p>Wind Speed</p>
                      <p>{api.wind.speed} km/H</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
