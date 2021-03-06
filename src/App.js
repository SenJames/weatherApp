import './App.css';
import Mainview from './components/Mainview';
import Side from './components/Side';
import { useState, useEffect } from 'react'
import axios from "axios";


function App() {
  const [val, setVal] = useState([])
  const [location, setlocation] = useState([])
  const [status, setStatus] = useState(false)


  const receiveDate = (weather, status) => {
    setStatus(status)
    setVal(weather)

  }



  const makeCall =(lon, lat)=>{
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
    const url = `http://127.0.0.1:8000/open/test/${lat}/${lon}`
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
        setStatus(false);
        const url = `http://127.0.0.1:8000/open/test/lagos`

        axios.get(url).then((response) => {
            setlocation(response.data['data']);
          }).catch(error => {
           console.log(error)
          });
      } else {
        setStatus(false);
        navigator.geolocation.getCurrentPosition((position) => {
          makeCall(position.coords.longitude, position.coords.latitude)
          
        }, () => {
          setStatus(false);
        });
      }
    }
    getPresentLocation()
    
  }, [])
  console.log(location['unsplash'])
  console.log(status)
  console.log(val.length)
  return (
    <div className="App">
      <section className='main'>
        <div className='left' style={{backgroundImage: status === false  ? `url(${location['unsplash']})`:  `url(${val['unsplash']})`}}>
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
