'use client';

import LoadingContainer from '@/app/components/LoadingContainer';
import { Box, Card, Container, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react'
import InputUnregistered from '@/app/components/app/inputs/InputUnregistered';
import Button from '@/app/components/app/Button';

import toast from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface ElementProps {
    currentUser?: SafeUser | null;
    fieldOrder?: boolean;
    header: any;
    headerStyles?: any;
}

const ChangePasswordView: React.FC<ElementProps> = ({
    currentUser,
    fieldOrder,
    header,
    headerStyles,
}) => {
    const defaultError = {oldPassword:false, newPassword:false};
    const defaultData = {email: currentUser?.email, oldPassword: '', newPassword: '', newPasswordConfirm: '' };

    const router = useRouter();
    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(defaultError);

    const handleInputChange = (field: string, fieldValue: any) => {
        const value = fieldValue.target.value;
        setData({ ...data, [field]: value });
    }


    const onSubmit = useCallback(async() => {
      setErrors(defaultError);
      if(data.newPassword !== data.newPasswordConfirm){
        setErrors({...errors,['newPassword']:true});
        return;
      }
        setIsLoading(true);
        try {
          const response = await fetch('/api/auth/verify-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

    
          if (!response.ok) {
            setErrors({...errors,['oldPassword']:true});
            throw new Error('Verify your password.');
          }
    
          // Show success message and possibly redirect
          toast.success('The password has changed.', {
            duration: 5000,
            position: 'top-center',
          
          });
          setData(defaultData);

          
        } catch (error: any) {
          toast.error(error.message || 'Failed to change the password.');
        } finally{
          setIsLoading(false);
        }
      },[data]);

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
                    <div className='md:w-6/12 h-full' >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='flex flex-col w-full mb-5'>

                        <InputUnregistered
                            label="Old Password"
                            value={data.oldPassword}
                            required
                            type='password'
                            onChange={(value) => { handleInputChange('oldPassword', value) }}
                            />
                        {errors.oldPassword &&
                            <text className='font-bold text-red-500'>Verify your password!!!</text>
                        }
                        </div>
                        <InputUnregistered
                            label="New Password"
                            value={data.newPassword}
                            required
                            type='password'
                            onChange={(value) => { handleInputChange('newPassword', value) }}
                            />
                        
                      <div className='flex flex-col w-full mt-5 mb-10'>

                        <InputUnregistered
                        label="New Password Confirm"
                        value={data.newPasswordConfirm}
                        required
                        type='password'
                        onChange={(value) => { handleInputChange('newPasswordConfirm', value) }}
                        />
                        {errors.newPassword &&
                        <text className='font-bold text-red-500'>The new password and the new password confirm do not match!!!</text>
                      }
                      </div>


                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='w-full'>
                        <Button full label='Change Password' onClick={onSubmit}/>
                        </div>

                    </Box>
                    </div>

                </Card>

            </Container>
        </LoadingContainer>


    )
}

export default ChangePasswordView