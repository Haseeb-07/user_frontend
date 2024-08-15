import React from 'react';
import Select from 'react-select';
import star from '../Images/star.jpeg';

const DestinationDropdown = ({ destinations, onChange }) => {
  const options = [
    { value: 'Faisal Mosque', label: 'Faisal Mosque' },
    { value: 'Margalla Hills', label: 'Margalla Hills' },
    { value: 'Lake View Park', label: 'Lake View Park' }
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 30,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'gray',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0px 6px',
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
  };

  const handleChange = (selectedOptions) => {
    onChange(selectedOptions.map(option => option.value));
  };

  return (
    <div className="form-input-container">
      <label htmlFor="destinations" className="form-label">
        Where you want to travel:<img src={star} alt="star" />
      </label>
      <Select
        id="destinations"
        name="destinations"
        options={options}
        value={options.filter(option => destinations.includes(option.value))}
        onChange={handleChange}
        isMulti
        styles={customStyles}
        className="form-input"
      />
    </div>
  );
};

export default DestinationDropdown;
