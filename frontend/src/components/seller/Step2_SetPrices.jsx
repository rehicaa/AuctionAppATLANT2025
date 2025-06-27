import React from 'react';

const Step2_SetPrices = ({ nextStep, prevStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    
    if (parseFloat(values.startPrice) <= 0) {
      alert("Start price must be greater than zero.");
      return;
    }
    if (!values.startTime || !values.endTime) {
      alert("Please select start and end dates.");
      return;
    }
    const startDate = new Date(values.startTime);
    const endDate = new Date(values.endTime);
    if (endDate <= startDate) {
      alert("End date must be after the start date.");
      return;
    }

    nextStep();
  };

  return (
    <div className="form-step">
      <h2>2. Set Prices</h2>
      <div className="form-group">
        <label>Your start Price</label>
        <input
          type="number"
          onChange={handleChange('startPrice')}
          defaultValue={values.startPrice}
          placeholder="$"
          required
        />
      </div>
      <div className="date-group">
        <div className="form-group">
            <label>Start date</label>
            <input
              type="date"
              onChange={handleChange('startTime')}
              defaultValue={values.startTime}
              required
            />
        </div>
        <div className="form-group">
            <label>End date</label>
            <input
              type="date"
              onChange={handleChange('endTime')}
              defaultValue={values.endTime}
              required
            />
        </div>
      </div>
       <p className="info-text">The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
      <div className="form-navigation">
        <button onClick={prevStep} className="btn-secondary">BACK</button>
        <button onClick={continueStep} className="btn-primary">NEXT</button>
      </div>
    </div>
  );
};

export default Step2_SetPrices;
