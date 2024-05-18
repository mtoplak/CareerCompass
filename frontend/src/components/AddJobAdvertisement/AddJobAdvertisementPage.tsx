"use client"
import { api } from '@/constants';
import { Company } from '@/types/company';
import React, { useState } from 'react';

type Props = {
    company: Company;
  };

  //bo treba popravit <333 TODO

const AddJobAdvertisementPage= ({ company }: Props) =>  {
  const [formData, setFormData] = useState({
    position: '',
    description: '',
    city: '',
    company_linked: '',
    company: `${company.name}`,
    url: `${api}/podjetje/${company.slug}`,
    source: 'Career Compass'
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Job advertisement created successfully!');
      } else {
        alert('Failed to create job advertisement.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl my-10 mx-auto mt-10 p-6 bg-white shadow-md rounded-lg mt-[100px]">
      <h1 className="text-2xl font-bold mb-6">Dodaj zaposlitev</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700 font-semibold mb-2">
            Naziv:
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Opis:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
            Lokacija:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Dodaj oglas
        </button>
      </form>
    </div>
  );
};

export default AddJobAdvertisementPage;
