import { BsCloudRainHeavy } from "react-icons/bs";



const Mainview = ({ color, details, loc }) => {
    // console.log(details)
    const weathIcon = `https://openweathermap.org/img/w/${details.weather && details.weather[0].icon}.png`
    const weathIconUser = `https://openweathermap.org/img/w/${loc.weather && loc.weather[0].icon}.png`

    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const OpenApiOffset = details.timezone
    const userLocationOffset = loc.timezone
    const newDate = utc + (1000 * OpenApiOffset ? OpenApiOffset :userLocationOffset)
    const end = new Date(newDate)

    return (
        <div className="main-view" style={{'color':color}}>
            <div className="degree">
                <p className="degree-number">{Object.keys(details).length > 0 ? (details.main.temp/10).toPrecision(2) : Object.keys(loc).length > 0 ? (loc.main.temp/10).toPrecision(2): "00"}</p>
                <p className="degree-number1">o</p> 
            </div>
            <div className="location">
                <p className="location-tag">{Object.keys(details).length > 0 ? details.name : Object.keys(loc).length > 0 ? loc.name :'London'}</p>
                <p className="location-time">{`Timezone: ${Object.keys(details).length > 0 ? `${end.getDay()}-${end.getMonth()}-${end.getFullYear()} || ${end.getHours()}: ${end.getMinutes()}: ${end.getSeconds()}` :  Object.keys(loc).length > 0 ? `${end.getDay()}-${end.getMonth()}-${end.getFullYear()} || ${end.getHours()}: ${end.getMinutes()}: ${end.getSeconds()}` : '06:09'}`}</p>
            </div>
            <div className="icon">
                <div>
                    { Object.keys(details).length > 0 ? <img src={weathIcon} alt=""/> : Object.keys(loc).length > 0 ?  <img src={weathIconUser} alt=""/> : <BsCloudRainHeavy />}
                </div>
                {Object.keys(details).length > 0  ? `${details.weather && details.weather[0].main}`: Object.keys(loc).length > 0  ? `${loc.weather && loc.weather[0].main}` :"weather"}
            </div>
        </div>
    )
}

export default Mainview
