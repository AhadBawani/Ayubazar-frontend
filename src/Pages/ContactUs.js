import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Your Phone Number"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-gray-700 font-semibold">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Your City"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-gray-700 font-semibold">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Your State"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-semibold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full h-32 focus:outline-none focus:border-blue-500"
                            placeholder="Your Message"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
