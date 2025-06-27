import React, { useState, useEffect } from 'react';
import { FiUser, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import authService from '../../services/authService';

const AccordionSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section className="profile-section accordion">
            <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                <h4>{title}</h4>
                <FiChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
            </div>
            {isOpen && <div className="accordion-content">{children}</div>}
        </section>
    );
};

const ProfileTab = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        dob_dd: '', dob_mm: '', dob_yyyy: '', phone: '',
        profileImageUrl: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.token) {
            try {
                const decoded = jwtDecode(user.token);
                setFormData(prev => ({
                    ...prev,
                    firstName: decoded.firstName || '',
                    lastName: decoded.lastName || '',
                    email: decoded.sub || ''
                }));
            } catch (error) {
                console.error("Failed to decode token:", error);
                authService.logout();
            }
        }
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);
        
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, uploadFormData);
            if (response.data && response.data.data && response.data.data.url) {
                setFormData(prev => ({ ...prev, profileImageUrl: response.data.data.url }));
            }
        } catch (error) {
            console.error("Image upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };
    
    return (
        <form className="profile-form">
            <section className="profile-section">
                <h3>Personal Information</h3>
                <div className="personal-info-layout">
                    <div className="avatar-container">
                        <div className="avatar-placeholder">
                            {formData.profileImageUrl ? (
                                <img src={formData.profileImageUrl} alt="Profile" className="avatar-image" />
                            ) : (
                                <FiUser size={80} />
                            )}
                        </div>
                        <label htmlFor="photo-upload" className="link-button">
                            {isUploading ? 'Uploading...' : 'Change photo'}
                        </label>
                        <input id="photo-upload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} disabled={isUploading} />
                    </div>
                    <div className="form-fields">
                        <div className="form-row">
                            <div className="form-group"><label>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></div>
                            <div className="form-group"><label>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
                        </div>
                        <div className="form-group"><label>Email Address</label><input type="email" name="email" value={formData.email} disabled /></div>
                        <div className="form-group"><label>Date of Birth</label><div className="form-row date-inputs"><input name="dob_dd" placeholder="DD" value={formData.dob_dd} onChange={handleChange} /><input name="dob_mm" placeholder="MM" value={formData.dob_mm} onChange={handleChange} /><input name="dob_yyyy" placeholder="YYYY" value={formData.dob_yyyy} onChange={handleChange} /></div></div>
                        <div className="form-group"><label>Phone Number</label><div className="phone-input-container"><input name="phone" placeholder="+32534231564" value={formData.phone} onChange={handleChange} /><span className="verification-status">Not verified</span></div></div>
                    </div>
                </div>
            </section>

            <AccordionSection title="Card Information (Optional)">
                <p>Card details form goes here...</p>
            </AccordionSection>

            <AccordionSection title="Shipping Address (Optional)">
                <p>Shipping address form goes here...</p>
            </AccordionSection>
            
            <div className="save-button-container">
                <button type="submit" className="save-info-btn">SAVE INFO</button>
            </div>
        </form>
    );
};

export default ProfileTab;
