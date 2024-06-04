'use client';

import { signIn} from 'next-auth/react';
import { useCallback, useState } from "react";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";


import {toast} from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import useLoginModal from '../../hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Heading from '@/app/components/app/Heading';
import Input from '@/app/components/app/inputs/Input';
import Button from '@/app/components/app/Button';
import Modal from './Modal';

const LoginModal = () => {
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


  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true);
    
    signIn('credentials',{
      ...data,
      redirect: false
    }).then((callback) =>{
      setIsLoading(false);
      if(callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error);
      }
    })
  }

  const toggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen();

  },[loginModal,registerModal]);
  
  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title="Welcome back " 
          subtitle="Login to your account!!"/>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className='flex justify-end'>
          <Button outline styles='border-transparent text-blue-500' onClick={()=>{}} label='Forget Password?'/>
        </div>
        
    </div>
  );

 
  return (
    <Modal
      disabled={isLoading}
      isOpen={true}
      title="Login "
      actionLabel="Continue"
      onClose={loginModal.onClose }
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default LoginModal