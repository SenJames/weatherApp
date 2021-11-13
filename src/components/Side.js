import React from 'react'
import { BsSearch } from "react-icons/bs"
import { useState } from 'react'
import axios from "axios";



const Side = ({ receiveDate, loc }) => {

    const [val, setValue] = useState("")
    const [weather, setWeather] = useState([])
    
    // API CALL
    const APIKEY = process.env.REACT_APP_API_KEY


    const onSubmit = (e)=>{
        e.preventDefault()

        if (!val){
            alert("Please enter location")
        }
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${APIKEY}`

        axios.get(url).then((response) => {
            setWeather(response.data);
          }).catch(error => {
           console.log(error)
          });
        setValue("")
    }




    return (
        <div className="side">
            <form className="formClass" onSubmit={onSubmit} onClick={receiveDate(weather)}>
                <div className="searchdets">                       
                    <input type="text" value={val}  onChange={(e)=>{setValue(e.target.value)}} placeholder="Another Location"/>
                    <button type="submit" className="search">
                        <BsSearch />
                    </button>
                </div>
            </form>
            <div>
                <p className="other_loc">{loc.length > 0 ? loc.name : weather ? weather.name : <p className="other_loc">Birmingham</p>  }</p>
                {/* <p className="other_loc">Birmingham</p> */}
                {/* <p className="other_loc">Birmingham</p>
                <p className="other_loc">Birmingham</p> */}
            </div>
            <hr style={{ color: "white",
            backgroundColor: "white",
            height: 2}}/>
            <div className="weatherDiv">
                <p className="weather_dets">Weather Details</p>
                {
                    weather.length <= 0 ? (
                        <div className="weather">
                            <p className="weather_cond">Cloudy</p>
                            <p className="weather_percent">{loc.clouds ? `${loc.clouds.all}%`  : "None"}</p>
                            <p className="weather_cond">Humidity</p>
                            <p className="weather_percent">{loc.main ? `${loc.main.humidity}%` : "None"}</p>
                            <p className="weather_cond">Wind</p>
                            <p className="weather_percent">{loc.wind ? `${loc.wind.speed}km/h` : "None"}</p>
                            <p className="weather_cond">Rain</p>
                            <p className="weather_percent">{loc.rain ? `${loc.rain["1h"]}mm` : "None"}</p>
                        </div>
                    ) : (
                        <div className="weather" key={weather.id}>
                            <p className="weather_cond">Cloudy</p>
                            <p className="weather_percent">{weather.clouds.all}%</p>
                            <p className="weather_cond">Humidity</p>
                            <p className="weather_percent">{weather.main.humidity}%</p>
                            <p className="weather_cond">Wind</p>
                            <p className="weather_percent">{weather.wind.speed}km/h</p>
                            <p className="weather_cond">Rain</p>
                            <p className="weather_percent">{weather.rain && weather.rain['1h']}mm</p>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}

export default Side
