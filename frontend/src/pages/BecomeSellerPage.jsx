import React, { useState } from 'react';
import Step1_ProductDetails from '../components/seller/Step1_ProductDetails';
import Step2_SetPrices from '../components/seller/Step2_SetPrices';
import Step3_Location from '../components/seller/Step3_Location';
import '../components/seller/BecomeSeller.css';

const BecomeSellerPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    description: '',
    imageUrl: '',
    startPrice: '',
    startTime: '',
    endTime: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = input => e => {
    setFormData({ ...formData, [input]: e.target.value });
  };
  
  const handleImageUpload = (url) => {
    setFormData({ ...formData, imageUrl: url });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1_ProductDetails
            nextStep={nextStep}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
            values={formData}
          />
        );
      case 2:
        return (
          <Step2_SetPrices
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 3:
        return (
          <Step3_Location
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      default:
        return <div>Wizard Finished</div>;
    }
  };

  return (
    <div className="become-seller-container">
      <h1>Become a Seller</h1>
      {renderStep()}
    </div>
  );
};

export default BecomeSellerPage;
