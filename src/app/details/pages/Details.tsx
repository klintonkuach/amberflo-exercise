import axios from 'axios';
import { Dispatch, FormEvent, SetStateAction, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMeter } from '../../../interfaces';
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY as string;

interface Props {
  meters: IMeter[];
  setMeters: Dispatch<SetStateAction<IMeter[]>>;
}

const Details: React.FC<Props> = ({ meters, setMeters }) => {
  const { id } = useParams();
  const apiNameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);
  const usedForBillingRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const meter = meters.find((meter) => meter.id === id);

  if (!meter) {
    return <div>No meter found with id {id}</div>;
  }

  const handleUpdateMeter = async (e: FormEvent) => {
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

    const updatedMeter: IMeter = {
      ...meter,
      api_name: apiNameRef.current.value,
      display_name: displayNameRef.current.value,
      active: activeRef.current.checked,
      used_for_billing: usedForBillingRef.current.checked,
      type: typeRef.current.value as IMeter['type'],
    };

    try {
      const response = await axios.put(
        `https://take-home-exercise-api.herokuapp.com/meters/${id!}`,
        updatedMeter,
        {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY,
          },
        }
      );

      const updatedMeterFromResponse = response.data as IMeter;
      const updatedMeters = meters.map((meter) =>
        meter.id === id ? updatedMeterFromResponse : meter
      );
      setMeters(updatedMeters);
      navigate('/');
    } catch (error) {
      alert('Cannot update initial meter');
      console.error(error);
    }
  };

  const handleDeleteMeter = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`https://take-home-exercise-api.herokuapp.com/meters/${id!}`, {
        headers: {
          'API-KEY': API_KEY,
        },
      });

      const updatedMeters = meters.filter((meter) => meter.id !== id);
      setMeters(updatedMeters);
      navigate('/');
    } catch (error) {
      alert('Cannot delete initial meter');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleUpdateMeter(e).catch((err) => console.error(err));
      }}
      className='container'
    >
      <label>
        API Name:
        <input type='text' ref={apiNameRef} defaultValue={meter.api_name} />
      </label>
      <label>
        Display Name:
        <input type='text' ref={displayNameRef} defaultValue={meter.display_name} />
      </label>
      <label>
        Active:
        <input type='checkbox' ref={activeRef} defaultChecked={meter.active} />
      </label>
      <label>
        Used for Billing:
        <input type='checkbox' ref={usedForBillingRef} defaultChecked={meter.used_for_billing} />
      </label>
      <label>
        Type:
        <select ref={typeRef} defaultValue={meter.type}>
          <option value='sum'>Sum</option>
          <option value='max'>Max</option>
          <option value='unique_count'>Unique Count</option>
        </select>
      </label>
      <button type='submit'>Update Meter</button>
      <button
        onClick={(e) => {
          handleDeleteMeter(e).catch((err) => console.error(err));
        }}
      >
        Delete Meter
      </button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </form>
  );
};

export default Details;
