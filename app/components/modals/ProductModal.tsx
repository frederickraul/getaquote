'use client';

import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal"
import Heading from '../Heading';
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { categoryList } from "@/app/const";
import useProductModal from "@/app/hooks/useProductModal";
import { SafeProduct } from "@/app/types";


enum STEPS{
  DESCRIPTION = 1,
  COMPONENTS = 2,
  CATEGORY = 3,
  PRICE = 4,
  COVER =5,
  INFO = 6,
  FINISH = 7
}

interface ProductModalProps { 
  listingId: string;
  product?: any;
  isOpen: boolean;
  onSave:(data:any)=>void;
  onClose:() => void;
}
const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onSave,
  onClose,
  listingId,
  product
})=>{
  const defaultData = {
    listingId:listingId,
    category: 'Weed',
    coverSrc:'',
    totalPrice: 1,
    portion:'',
    title: '',
    description: '',
    THC:5,
    CBD:5,
    stock: 1
  }


  useEffect(() => {
    setStep(1);

   if(product?.title){
    setValue('title',product?.title);
    setValue('description',product?.description);
    setValue('category',product?.category);
    setValue('coverSrc',product?.coverSrc);
    setValue('totalPrice',product?.totalPrice);
    setValue('portion',product?.portion);
    setValue('THC',product?.THC);
    setValue('CBD',product?.CBD);
    setValue('stock',product?.stock);
   }else{
    setValue('title',defaultData?.title);
    setValue('description',defaultData?.description);
    setValue('category',defaultData?.category);
    setValue('coverSrc',defaultData?.coverSrc);
    setValue('totalPrice',defaultData?.totalPrice);
    setValue('portion',defaultData?.portion);
    setValue('THC',defaultData?.THC);
    setValue('CBD',defaultData?.CBD);
    setValue('stock',defaultData?.stock);
   }
  }, [product])
  

  const router = useRouter();

  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      listingId:listingId,
      category: 'Weed',
      coverSrc:'',
      totalPrice: 1,
      portion:'',
      title: '',
      description: '',
      THC:5,
      CBD:5,
      stock: 1,
    },
  });

  const category = watch('category');
  const coverSrc = watch('coverSrc');
  const totalPrice = watch('totalPrice');
  const title = watch('title');
  const description = watch('description');
  const portion = watch('portion');
  const THC = watch('THC');
  const CBD = watch('CBD');
  const stock = watch('CBD');



  //For Regular Inputs
  const setCustomValue = (id: string, value:any) => {    
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    if(step !== STEPS.FINISH){
      return onNext();
    }
    
    setIsLoading(true);
    if(product?.id){
      onUpdateProduct(data);
    }else{
      onCreateProduct(data);
    }
    
  }

  const onCreateProduct = (data:any) => {

    axios.post('/api/products', data)
    .then(()=>{
      toast.success('Product Created');
      router.refresh();
      reset();
      setStep(STEPS.DESCRIPTION);
      onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false);
    }); 
  }

  const onUpdateProduct = (data:any) => {

    axios.post(`/api/products/${product.id}`, data)
    .then(()=>{
      toast.success('Product Updated');
      router.refresh();
      reset();
      setStep(STEPS.DESCRIPTION);
      onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false);
    }); 
  }
  
  const actionLabel = useMemo(() => {
    if(step === STEPS.FINISH){
      if(product?.id){
        return 'Update';
      }else{
        return 'Create';
      }
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.DESCRIPTION){
      return undefined;
    }

    return 'Back';
  }, [step]);


// DESCRIPTION STEP
 let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you like describe your product?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Product Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
       <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> 
    </div>
  )


// CATEGORY STEP
if(step === STEPS.CATEGORY){
   bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Product Category"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid
          grid-cols-
          md:grid-cols-2
          gap-3
          max-h-[45vh] 2xl:max-h-[50vh]
        ">
        {categoryList.map((item) =>(
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category)=>{
                setCustomValue('category',category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}

            />
          </div>
        ))}
      </div>

    </div>
  )
}

// ADDRESS STEP
if(step === STEPS.PRICE){
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Portion and price"
        subtitle="show what they get by the price!"
      />
          <Input
            id="portion"
            label="Portion"
            placeholder="1oz"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr/>
          <Input
            id="totalPrice"
            label="Price"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            formatPrice
            required
          />
    </div>
  )
}

// Psychoactive Component
if(step === STEPS.COMPONENTS){
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Psychoactive Compound"
        subtitle="show the percent of psychoactive compound!"
      />
          <Input
            id="THC"
            label="THC"
            placeholder=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            formatPercent
          />
          <hr/>
          <Input
            id="CBD"
            label="CBD"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            formatPercent
          />
    </div>
  )
}


  // INFO STEP
  if(step === STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Share stock"     
            subtitle="What your available stock?"
          />
              <Input
                id="stock"
                label="Stock"
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
             
      </div>
    )
  }

  
    // IMAGES STEP
    if(step === STEPS.COVER){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your product"
            subtitle="show guest what your product looks like!"
          />
          <ImageUpload 
            value={coverSrc}
            onChange={(value) => setCustomValue('coverSrc', value)}
          />
        </div>
      )
    }

    // FINISH STEP
    if(step === STEPS.FINISH){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Are you ready?"
            subtitle={product ? "Apply the new changes?" : "You are about to add a new product!!!"}
          />
        </div>
      )
    
    }

  return (
   <Modal
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit(onSubmit) }
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step ===STEPS.DESCRIPTION ? undefined : onBack}
    title={product? `Update product ${product.title}` : "Register new product"}
    body={bodyContent}
    disabled={isLoading}
   />
  )
}

export default ProductModal