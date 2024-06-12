'use client';

import { signIn} from 'next-auth/react';
import { useCallback, useState } from "react";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";


import {toast} from 'react-hot-toast';

import { redirect, useRouter } from 'next/navigation';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Heading from '@/app/components/app/Heading';
import Input from '@/app/components/app/inputs/Input';
import Button from '@/app/components/app/Button';
import Modal from './Modal';

const ResetPasswordModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues:{
      email:'',
      password:''
    }
  });


  // const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('There was an error sending the reset password email.');
      }

      // Show success message and possibly redirect
      toast.success('If the email is associated with an account, a password reset email will be sent.', {
        duration: 5000,
        position: 'top-center',
      
      });
      // Optionally, redirect to the login page or a page that says 'Check your email'
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset password email.');
    } finally{
      setIsLoading(false);
    }
  }

  
  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title="Forgot Password" 
          subtitle="You are not alone. We’ve all been here at some point!!"/>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className='flex justify-end'>
          <Button outline styles='border-transparent text-blue-500' onClick={()=>{router.push('/auth/signin')}} label='Remembered your password? Sign in'/>
        </div>
        
    </div>
  );

 
  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Forgot Password "
      actionLabel="Continue"
      onClose={loginModal.onClose }
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default ResetPasswordModal