'use client';

import LoadingContainer from '@/app/components/LoadingContainer';
import { Box, Card, Container, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react'
import InputUnregistered from '@/app/components/app/inputs/InputUnregistered';
import Button from '@/app/components/app/Button';
import toast from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import Heading from '@/app/components/app/Heading';
import InputPhone from '@/app/components/app/inputs/InputPhone';

interface ElementProps {
  currentUser?: SafeUser | null;
  business?: any;
  fieldOrder?: boolean;
  header: any;
  headerStyles?: any;
}

const BusinessContactView: React.FC<ElementProps> = ({
  currentUser,
  business,
  fieldOrder,
  header,
  headerStyles,
}) => {
  const defaultError = { name: false, address: false, location: false, phone: false, email: false };
  const defaultData = { name: business?.name, address: business?.address, location: business?.location, phone: business?.phone, email: business?.email };

  const router = useRouter();
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultError);
  const [profileVisible, setprofileVisible] = useState(false);

  const toggleModalProfile = () => {
    setprofileVisible(!profileVisible);
  }

  const handleInputChange = (field: string, fieldValue: any) => {
    if (field == 'phone') {
      setData({ ...data, [field]: fieldValue });
      return;
    }
    const value = fieldValue.target.value;
    setData({ ...data, [field]: value });
  }


  const onSubmit = useCallback(async () => {
    setErrors(defaultError);
    if (data.name == '') {
      setErrors({ ...errors, ['name']: true });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      // Show success message and possibly redirect
      toast.success('The Business Contact information is updated.', {
        duration: 8000,
        position: 'top-center',

      });

      router.refresh();


    } catch (error: any) {
      toast.error(error.message || 'Failed to update the bussines contact information.');
    } finally {
      setIsLoading(false);
    }
  }, [data, router]);




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
                    p-5
                    md:p-10
                    '>
          <div className='md:w-6/12 flex flex-col justify-between' >

            <div className='mb-5 flex flex-col items-center'>
              <Heading title='Fill with your business information' />

              <div className='w-full mt-5'>
                {/* Field */}
                <div className='flex flex-col w-full mb-5'>
                  <InputUnregistered
                    label="Business Name"
                    value={data.name}
                    onChange={(value) => { handleInputChange('name', value) }}
                  />

                  {errors.name &&
                    <text className='font-bold text-red-500'>Required!!!</text>
                  }
                </div>

                {/* Field */}
                <div className='flex flex-col w-full mb-5'>
                  <InputUnregistered
                    label="Address"
                    value={data.address}
                    onChange={(value) => { handleInputChange('address', value) }}
                  />

                  {errors.name &&
                    <text className='font-bold text-red-500'>Required!!!</text>
                  }
                </div>

                {/* Field */}
                <div className='flex flex-col w-full mb-5'>
                  <InputUnregistered
                    label="Location"
                    placeholder='Los Angeles, CA 90001'
                    value={data.location}
                    onChange={(value) => { handleInputChange('location', value) }}
                  />

                  {errors.location &&
                    <text className='font-bold text-red-500'>Required!!!</text>
                  }
                </div>

                {/* Field */}
                <div className='flex flex-col w-full mb-5'>
                  <InputPhone
                    label="Phone"
                    value={data.phone}
                    onChange={(value, value2) => { handleInputChange('phone', value) }}
                  />

                  {errors.phone &&
                    <text className='font-bold text-red-500'>Required!!!</text>
                  }
                </div>
                {/* Field */}
                <div className='flex flex-col w-full mb-5'>
                  <InputUnregistered
                    label="Email"
                    value={data.email}
                    onChange={(value) => { handleInputChange('email', value) }}
                  />

                  {errors.email &&
                    <text className='font-bold text-red-500'>Required!!!</text>
                  }
                </div>

              </div>
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className='w-full'>
                <Button full label='Update' onClick={onSubmit} />
              </div>

            </Box>
          </div>

        </Card>

      </Container>

    </LoadingContainer>


  )
}

export default BusinessContactView