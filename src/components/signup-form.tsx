// SignUpForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  expiry: number; // Unix timestamp
  userId: string;
}

interface SignUpFormData {
  email: string;
  dateOfBirth: string;
}

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    // const redirectUri = encodeURIComponent(window.location.origin);
    // const auth0Domain = import.meta.env.VITE_AUTHORITY;
    // const clientId = import.meta.env.VITE_CLIENT_ID;
    // const responseType = 'code';
    const scope = ['openid', 'profile', 'email'];
    const prompt = 'consent';
    
    // window.location.href = `https://${auth0Domain}/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&prompt=${prompt}`;

    const queryString = `?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=${scope}&prompt=${prompt}`;

    try {
      const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}${queryString}`, data); // Replace with your Microsoft Entra ID API endpoint
      console.log(response);
      const signUpResponse: SignUpResponse = response.data;      

      // Handle the response (e.g., store tokens in state/context)
      console.log('Sign-up successful:', signUpResponse);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <span>Email is required</span>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" {...register('dateOfBirth', { required: true })} />
        {errors.dateOfBirth && <span>Date of Birth is required</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
