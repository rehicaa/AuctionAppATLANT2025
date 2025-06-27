import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auctionService from '../../services/auctionService';

const Step3_Location = ({ prevStep, handleChange, values }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { title, categoryId, description, imageUrl, startPrice, startTime, endTime } = values;

        const auctionData = {
            title,
            description,
            startPrice: parseFloat(startPrice),
            startTime: `${startTime}T00:00:00`, // Formatiranje datuma za backend
            endTime: `${endTime}T23:59:59`,
            imageUrl,
            categoryId: parseInt(categoryId),
        };

        auctionService.createAuction(auctionData)
            .then(response => {
                setLoading(false);
                // Preusmeri korisnika na stranicu novog proizvoda
                navigate(`/auctions/${response.data.id}`);
            })
            .catch(err => {
                const resMessage =
                    (err.response &&
                     err.response.data &&
                     err.response.data.message) ||
                    err.message ||
                    err.toString();
                
                setError(resMessage);
                setLoading(false);
            });
    }

  return (
    <div className="form-step">
      <h2>3. Location & Shipping</h2>
       <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Address (Optional)</label>
                <input
                  type="text"
                  onChange={handleChange('address')}
                  defaultValue={values.address}
                />
            </div>
            
            {error && <p className="error-text">{error}</p>}
            
            <div className="form-navigation">
                <button type="button" onClick={prevStep} className="btn-secondary">BACK</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'SUBMITTING...' : 'DONE'}
                </button>
            </div>
       </form>
    </div>
  );
};

export default Step3_Location;
