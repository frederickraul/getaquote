import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import InputUnregistered from '../inputs/InputUnregistered';
import InputText from '../inputs/InputText';
import { Rating } from '@mui/material';

interface ReviewProps {
    review: any;
    isOpen: boolean;
    onSave:(data:any)=>void;
    onUpdate?:(data:any)=>void;
    onClose:() => void;
    isLoading?:boolean;
  }

  const ReviewModal: React.FC<ReviewProps> = ({
    review,
    isOpen,
    onSave,
    onUpdate,
    onClose,
    isLoading,
  }) => {
    

    useEffect(() => {
    if(review?.id){
      setData(review);
      setIsUpdate(true);
    }
    }, [review]);
    
    const defaultReview = {
      id: '',
      title: "",
      body: '',
      rating: 0,
      createdAt: 'Just now'}

    const [data, setData] = useState(defaultReview);
    const [isUpdate, setIsUpdate] = useState(false);
    const defaultErrors= {
      stars: false,
      title: false,
      body:false,
    }
    const [errors, setErrors] = useState(defaultErrors);

    const onChange=(id:string, value:any)=>{
        setErrors(defaultErrors);
        setData({...data, [id]: value});
    }


    const handleSave = () => {
      if(data.title.length < 4){
        setErrors({...errors, title: true})
        return;
      }
      if(data.body.length < 10){
        setErrors({...errors, body: true})
        return;
      }
      if(data.rating < 1){
        setErrors({...errors, stars: true})
        return;
      }
      if(isUpdate){
        onUpdate && onUpdate(data);
        return;
      }
      onSave(data);
      
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
              title="" 
              subtitle="Write about your own personal experience."/>
              <div className='flex flex-col items-center my-5'>
                    <span className='text-lg font-bold mb-3'>My rating</span>
                    <Rating 
                        disabled={isLoading}
                        value={Number(data.rating )|| 0} 
                        onChange={(event, newValue) => {
                        onChange('rating',newValue);}} 
                            size='large' 
                            className='text-3xl text-black'/>
                      {errors.stars && <div className='text-red-500 font-bold'>You must rate the product</div>}
              </div>
              {errors.title && <div className='text-red-500 font-bold'>The title is too short</div>}
            <InputUnregistered
              disabled={isLoading}
              label="Title"
              value={data.title}
              onChange={(value)=>{onChange('title',value.target.value);}}
              required
            />

            {errors.body && <div className='text-red-500 font-bold'>The body is too short</div>}
            <InputText
                disabled={isLoading}
                label='Body'
                value={data.body}
                onChange={(value)=>{onChange('body',value.target.value);}}
                required
                />

            
        </div>
      );
    
  return (
    <Modal
        size='sm'
        isOpen={isOpen}
        title="Write a review"
        body={bodyContent}
        onClose={onClose}
        onSubmit={handleSave}
        actionLabel="Continue"
        disabled={isLoading}

    />
  )
}

export default ReviewModal