'use client';

import LoadingContainer from '@/app/components/LoadingContainer';
import { Avatar, Box, Card, Container, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react'
import Field from '../../components/input/Field';
import InputUnregistered from '@/app/components/app/inputs/InputUnregistered';
import Button from '@/app/components/app/Button';

import toast from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { defaultImage } from '@/app/const';
import Heading from '@/app/components/app/Heading';
import FloatingButton from '../../components/FloatingButton';
import { FaEdit } from 'react-icons/fa';
import { BiEdit, BiEditAlt } from 'react-icons/bi';
import ImageUpload from '@/app/components/app/inputs/ImageUpload';
import Modal from '../../components/modal/Modal';
interface ElementProps {
    currentUser?: SafeUser | null;
    fieldOrder?: boolean;
    header: any;
    headerStyles?: any;
}

const ProfileView: React.FC<ElementProps> = ({
    currentUser,
    fieldOrder,
    header,
    headerStyles,
}) => {
    const defaultError = {name:false};
    const defaultData = {name: currentUser?.name, image: currentUser?.image, email: currentUser?.email, oldPassword: '', newPassword: '', newPasswordConfirm: '' };

    const router = useRouter();
    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(defaultError);
    const [profileVisible, setprofileVisible] = useState(false);

    const toggleModalProfile = () =>{
        setprofileVisible(!profileVisible);
    }

    const handleInputChange = (field: string, fieldValue: any) => {
        if(field == 'image'){
            setData({ ...data, [field]: fieldValue });
            return;
        }
        const value = fieldValue.target.value;
        setData({ ...data, [field]: value });
    }


    const onSubmit = useCallback(async() => {
      setErrors(defaultError);
      if(data.name == ''){
        setErrors({...errors,['name']:true});
        return;
      }
        setIsLoading(true);
        try {
          const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

    
          // Show success message and possibly redirect
          toast.success('The profile is updated.', {
            duration: 5000,
            position: 'top-center',
          
          });

          router.refresh();

          
        } catch (error: any) {
          toast.error(error.message || 'Failed to update the profile.');
        } finally{
          setIsLoading(false);
        }
      },[data, router]);


     const  bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title=""
            subtitle=""
          />
          <ImageUpload 
            value={data.image || defaultImage}
            onChange={(value) => handleInputChange('image', value)}
          />
        </div>
      )

    return (
        <LoadingContainer isLoading={isLoading}>
            <Container className='h-[70vh]'>
                <Stack className='my-5' direction="row" alignItems="center" justifyContent="space-between" >
                    <div className='text-2xl md:text-4xl'>
                        {header}
                    </div>
                </Stack>
                <Card className='
                   
                    bg-white 
                    h-full
                    p-5
                    md:p-10
                    '>
                    <div className='md:w-6/12 h-full  flex
                    flex-col
                    justify-between' >

                    <div className='mb-5 flex flex-col justify-center items-center'>
                       
                        <div className='
                        relative
                            w-fit
                            p-3 
                            rounded-full 
                            ring-2 
                            ring-blue-300 
                            dark:ring-blue-500 mb-5'>
                            <Avatar 
                                alt={data.name || 'image'}
                                src={data.image || defaultImage} 
                                sx={{ width: 150, height: 150 }} />
                                 <div className='absolute top-0 right-0'>
                                 <FloatingButton  color='bg-blue-500' label='' icon={BiEditAlt} onClick={toggleModalProfile}/>
                                 </div>
                        </div>
                        <Heading title={data.name || ''}/>
                    <div className='w-full'>
                        <div className='flex flex-col w-full mb-5'>
                        
                        <InputUnregistered
                            label="Name"
                            value={data.name}
                            required
                            onChange={(value) => { handleInputChange('name', value) }}
                            />

                        {errors.name &&
                            <text className='font-bold text-red-500'>Required!!!</text>
                        }
                        </div>
                       


                    </div>
                    </div>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='w-full'>
                        <Button full label='Update' onClick={onSubmit}/>
                        </div>

                    </Box>
                    </div>

                </Card>

            </Container>
            <Modal
                isOpen={profileVisible}
                onClose={toggleModalProfile}
                onSubmit={toggleModalProfile}
                actionLabel="Close"
                secondaryActionLabel=""
                secondaryAction={undefined }
                title="Change your profile picture!!!"
                body={bodyContent}
                disabled={isLoading}
            />
        </LoadingContainer>


    )
}

export default ProfileView