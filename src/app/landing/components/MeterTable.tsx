import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMeter, SortConfig } from '../../../interfaces';

interface Props {
  meters: IMeter[];
}

const MeterTable: FC<Props> = ({ meters }) => {
  // The `sortConfig` state will be an object with `key` (which field to sort by) and `direction` (ascending or descending).
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const navigate = useNavigate();

  // The sortedMeters variable is a memoized value that contains the meters sorted according to the current sorting configuration. It's recalculated whenever meters or sortConfig changes.
  const sortedMeters = useMemo(() => {
    const sortableMeters = [...meters];

    if (sortConfig !== null) {
      sortableMeters.sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableMeters;
  }, [meters, sortConfig]);

  // Function to update the `sortConfig` based on the `key` clicked on in the table header.
  const requestSort = (key: keyof IMeter) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort('display_name')}>Display Name</th>
          <th onClick={() => requestSort('api_name')}>API Name</th>
          <th onClick={() => requestSort('active')}>Active</th>
          <th onClick={() => requestSort('used_for_billing')}>Used For Billing</th>
          <th onClick={() => requestSort('type')}>Type</th>
        </tr>
      </thead>
      <tbody>
        {sortedMeters.map((meter) => (
          <tr onClick={() => navigate(`/details/${meter.id!}`)} key={meter.id}>
            <td>{meter.display_name}</td>
            <td>{meter.api_name}</td>
            <td>{meter.active ? 'Yes' : 'No'}</td>
            <td>{meter.used_for_billing ? 'Yes' : 'No'}</td>
            <td>{meter.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MeterTable;
