import { Dispatch, FC, FormEvent, useRef } from 'react';
import axios from 'axios';
import { IMeter } from '../../../interfaces';
import { useNavigate } from 'react-router-dom';
import './CreateMeter.css';
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY as string;

interface Props {
  setMeters: Dispatch<React.SetStateAction<IMeter[]>>;
}

const CreateMeter: FC<Props> = ({ setMeters }) => {
  const apiNameRef = useRef<HTMLInputElement | null>(null);
  const displayNameRef = useRef<HTMLInputElement | null>(null);
  const activeRef = useRef<HTMLInputElement | null>(null);
  const usedForBillingRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !apiNameRef.current ||
      !displayNameRef.current ||
      !activeRef.current ||
      !usedForBillingRef.current ||
      !typeRef.current
    ) {
      return;
    }

    const newMeter = {
      api_name: apiNameRef.current.value,
      display_name: displayNameRef.current.value,
      active: activeRef.current.checked,
      used_for_billing: usedForBillingRef.current.checked,
      type: typeRef.current.value,
    };

    try {
      const response = await axios.post<IMeter>(
        'https://take-home-exercise-api.herokuapp.com/meters',
        newMeter,
        {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY,
          },
        }
      );
      setMeters((prevMeters) => [...prevMeters, response.data]);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className='container'
    >
      <label>
        API Name:
        <input type='text' ref={apiNameRef} placeholder='API Name' required />
      </label>
      <label>
        Display Name:
        <input type='text' ref={displayNameRef} placeholder='Display Name' required />
      </label>
      <label>
        <input type='checkbox' ref={activeRef} />
        Active
      </label>
      <label>
        <input type='checkbox' ref={usedForBillingRef} />
        Used For Billing
      </label>
      <select ref={typeRef} required>
        <option value=''>Select a type...</option>
        <option value='sum'>Sum</option>
        <option value='max'>Max</option>
        <option value='unique_count'>Unique Count</option>
      </select>
      <button type='submit'>Create</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </form>
  );
};

export default CreateMeter;
