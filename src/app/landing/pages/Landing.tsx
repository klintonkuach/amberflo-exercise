import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMeter } from '../../../interfaces';
import MeterTable from '../components/MeterTable';
import './Landing.css';

interface Props {
  meters: IMeter[];
}

const Landing: FC<Props> = ({ meters }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button className='createButton' onClick={() => navigate('/create')}>
        + Create Meter
      </button>
      <MeterTable meters={meters} />
    </div>
  );
};

export default Landing;
