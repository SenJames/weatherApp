import './App.css';
import Mainview from './components/Mainview';
import Side from './components/Side';
import { useState, useEffect } from 'react'
import axios from "axios";


function App() {
  const [val, setVal] = useState([])
  const [location, setlocation] = useState([])
  const [status, setStatus] = useState(null)


  const receiveDate = (weather) => {
    setVal(weather)

  }



  const makeCall =(lon, lat)=>{
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
    const url = `https://jweatherapp.herokuapp.com/open/test/${lat}/${lon}`
    console.log(lon," ", lat)

        axios.get(url).then((response) => {
            setlocation(response.data['data']);
          }).catch(error => {
           console.log(error)
          });
  }

  useEffect(() => {
    const getPresentLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
        const url = `https://jweatherapp.herokuapp.com/open/test/lagos`

        axios.get(url).then((response) => {
            setlocation(response.data['data']);
          }).catch(error => {
           console.log(error)
          });
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus(null);
          makeCall(position.coords.longitude, position.coords.latitude)
          
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }
    getPresentLocation()
    
  }, [])

  return (
    <div className="App">
      <section className='main'>
        <div className='left' style={{backgroundImage: val.length > 0 ? `url(${val['unsplash']})`: location && `url(${location['unsplash']})` }}>
          <p className="webName">jamie.weather</p>
        <div className="bottomview">
          <Mainview color="white"  loc={location} details={val.name === ""  ? {} : val}/>
        </div>
        </div>
        <div className='right'>
          <div className="right-slide">
            <Side receiveDate={receiveDate} loc={location}/> 
          </div>
          <div className='bgImage' alt='sidebar'> 
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
