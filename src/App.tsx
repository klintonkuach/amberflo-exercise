import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateMeter from './app/create/pages/CreateMeter';
import Details from './app/details/pages/Details';
import Landing from './app/landing/pages/Landing';
import { IMeter } from './interfaces';
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY as string;

function App() {
  const [meters, setMeters] = useState<IMeter[]>([]);

  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const result = await axios.get<IMeter[]>(
          'https://take-home-exercise-api.herokuapp.com/meters',
          {
            headers: {
              'API-KEY': API_KEY,
            },
          }
        );

        setMeters(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeters().catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      {meters.length > 0 && (
        <>
          <Route path='/' element={<Landing meters={meters} />} />
          <Route path='/details/:id' element={<Details meters={meters} setMeters={setMeters} />} />
          <Route path='/create' element={<CreateMeter setMeters={setMeters} />} />
        </>
      )}
    </Routes>
  );
}

export default App;
