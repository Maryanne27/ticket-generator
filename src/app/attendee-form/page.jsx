'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EnvelopeIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Button from '../component/Button';
import Steps from '../component/Steps';

export default function Page() {
const router = useRouter();
const [formData, setFormData] = useState({ name: '', email: '', request: '', uploadImage: '' });
const [errors, setErrors] = useState({});
const [publicId, setPublicId] = useState(null);

const inputFields = [
  { name: 'name', label: 'Enter your name', type: 'text', icon: null },
  { name: 'email', label: 'Enter your email', type: 'email', icon: <EnvelopeIcon className="absolute left-3 top-3 text-[#24A0B5] w-6 h-6" /> },
  { name: 'request', label: 'Special request?', type: 'textarea', icon: null },
];

useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem('formData') || '{}');
  setFormData({ ...formData, ...savedData });
}, []);

useEffect(() => {
  localStorage.setItem('formData', JSON.stringify(formData));
}, [formData]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const validateForm = () => {
  const newErrors = {};

  if (formData.name.length < 6) {
    newErrors.name = "Name must be at least 6 characters";
  }

  if (!formData.email.includes("@") || !formData.email.includes(".")) {
    newErrors.email = "Enter a valid email";
  }

  if (formData.request && formData.request.length < 5) {
    newErrors.request = "Request must be at least 5 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


const handleSubmit = () => {
  if (validateForm()) router.push('/success-page');
};

return (
  <div className="relative z-10 p-6 border md:w-[700px] w-[375px] mx-auto border-bgBlue rounded-lg shadow-lg">
    <Steps title="Attendee Details" step="2" progress="60%" />
    <div className="md:w-full mx-auto bg-darkBlue p-6 border border-bgBlue rounded-lg shadow-lg">
      <div className="w-full border border-bgBlue rounded-lg px-4 bg-[#08252B] pb-14 pt-4">
        <p className="text-[#FAFAFA] pb-10 text-base md:text-lg font-roboto font-normal">Upload Profile Photo</p>
        {publicId && <CldImage src={publicId} alt={publicId} />}
        <CldUploadWidget uploadPreset="ticket" onSuccess={({ event, info }) => {
          if (event === "success") {
            setPublicId(info?.publicId);
            setFormData((prev) => ({ ...prev, uploadImage: info?.secure_url }));
          }
        }}>
          {({ open }) => (
            <div
              className="p-6 rounded-lg h-40 md:bg-[#000000] bg-transparent flex items-center justify-center cursor-pointer"
              onClick={() => open()}
            >
              {formData.uploadImage ? (
                <img src={formData.uploadImage} alt="Uploaded" className="w-56 h-56 rounded-3xl object-cover border-4 border-[#24A0B5]/50" />
              ) : (
                <div className="w-56 h-56 bg-bgBlue border-4 border-[#24A0B5]/50 flex flex-col items-center justify-center rounded-3xl">
                  <CloudArrowUpIcon className="w-6 h-6" />
                  <p className="text-gray-400 text-xs sm:text-sm text-center">Drag & drop or click to upload</p>
                </div>
              )}
            </div>
          )}
        </CldUploadWidget>
      </div>
      
      {inputFields.map(({ name, label, type, icon }, i) => (
  <div key={i} className="mt-4">
    <label className="text-gray-300 text-sm">{label}</label>
    <div className="relative">
      {icon}
      {type === 'textarea' ? (
        <textarea
          name={name}
          className={`w-full p-3 bg-[#02191D] text-gray50 rounded-lg border focus:outline-none resize-none ${
            errors[name] ? 'border-red-500' : 'border-[#24A0B5]/30'
          }`}
          placeholder="Textarea"
          value={formData[name]}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          className={`w-full p-3 ${name === 'email' ? 'pl-10' : ''} bg-[#02191D] text-gray50 rounded-lg border focus:outline-none transition-all ${
            errors[name] ? 'border-red-500' : 'border-[#24A0B5]/30'
          }`}
          value={formData[name]}
          onChange={handleChange}
        />
      )}
    </div>
    {errors[name] && (
      <p className="mt-2 flex items-center gap-2 text-red-400 text-sm animate-slideIn">
        <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
        {errors[name]}
      </p>
    )}
  </div>
))}

      {/* Buttons */}
      <div className="text-center mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <Button type="back" onClick={() => router.push('/')} />
        <Button type="freeTicket" onClick={handleSubmit} />
      </div>
    </div>
  </div>
);
}
