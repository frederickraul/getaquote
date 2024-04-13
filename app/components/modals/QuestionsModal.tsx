import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputUnregistered from '../inputs/InputUnregistered';
import Button from '../Button';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';

interface QuestionsModalProps {
    questions: any;
    isOpen: boolean;
    onSave:(data:any)=>void;
    onUpdate?:(data:any)=>void;
    onClose:() => void;
    isLoading?:boolean;
    isOwner?:any;
  }

  const QuestionsModal: React.FC<QuestionsModalProps> = ({
    questions,
    isOpen,
    onSave,
    onUpdate,
    onClose,
    isLoading,
    isOwner
  }) => {

    useEffect(() => {
            setfilteredQuestions(questions);
        
    }, [questions]);
    

    const [filteredQuestions, setfilteredQuestions] = useState([]);
    const [filterValue, setfilterValue] = useState('');
    const [error, setError] = useState(false);
    

    const filter = (value:string) =>{
        if(value.length <= 0){
            clear();
        }
        if(value.length >= 3){
            const currentQuestions = questions;
            if(currentQuestions === null){
                return
            }
            const filtered = currentQuestions.filter((item: any) => (item.question.toLowerCase()).includes(value.toLowerCase()));
            setfilteredQuestions(filtered);
        }
    }

    const clear = () => {
        setfilterValue('');
        if(questions != null)
        setfilteredQuestions(questions);
    }

    const handleSaveQuestion = () =>{
   
        if(filterValue.length <= 3){
            setError(true);
            return;
        }
        const data = {
            question:filterValue,
        }
        
        onSave(data);

        clear();
    }

    const bodyContent = (
        <div className='flex flex-col'>
            <div className={`
                    ${isOwner ? 'hidden' :'top-[75px] h-[100px]'}
                    fixed 
                    bg-white 
                    left-0 
                    right-0 
                    
                    `}>
                <div className='relative p-5'>
                    <div className='flex flex-row fixed w-[100%]'>
                        <div className='w-[78%] relative'> 
                        <InputUnregistered
                            label=''
                            onChange={(e)=>{
                                if(error){setError(false)}
                                setfilterValue(e.target.value);
                                filter(e.target.value);
                            }}
                            value={filterValue}
                        />
                        <span 
                            onClick={clear}
                            className='
                                absolute 
                                right-5 
                                top-3
                                mt-2 
                                cursor-pointer
                                text-blue-500'>
                                    <MdOutlineClear size={30}/>
                                </span>
                        </div>
                        <div className='w-[70px] aspect-square h-[70px] flex'>
                        <Button 
                            outline 
                            borderless 
                            styles='border-transparent' 
                            iconSize={35} 
                            icon={BiSearch} 
                            label='' 
                            onClick={()=>{}}/>
                        </div>
                    </div>
                    {error &&
                    <div className='mt-20 ml-2 relative text-red-500'>
                        The question is too short!!!
                    </div>
                    }
                </div>
            </div>
  
            <div className={`flex flex-col min-h-[500px] ${isOwner ? 'mt-[0px]' :  'mt-[100px]'}`}>
                {questions?.length < 1 &&
                <div className='text-neutral-500'>
                Nobody has asked questions yet.
                {isOwner ? '':' Do the first one!'}
                
                </div>
                }
                {filteredQuestions.map((question: any) =>(
                    
                    <div key={question.id} className='w-full flex flex-col mb-4'>
                         <div className="flex items-start">
                            <div>
                            <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-500 text-white font-medium text-sm">
                                Q
                            </span>
                            </div>

                            <p className="ml-4 md:ml-6 text-bold">
                            {question.question}
                            </p>
                        </div>
                        {question.answer !== '' &&
                        <div className="flex items-start mt-2 mb-2">
                            <div>
                            <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                                A
                            </span>
                            </div>

                            <p className="ml-4 md:ml-6 text-bold text-gray-800">
                            {question.answer}
                            </p>
                        </div>
  
                        }
                    </div>
                    ))
                }

              
            </div>
        </div>
    );
    return (
        <Modal
            size='sm'
            isOpen={isOpen}
            title="Looking for specific info?"
            body={bodyContent}
            onClose={onClose}
            onSubmit={handleSaveQuestion}
            actionLabel={isOwner ? '' : 'Post your question'}
            disabled={isLoading}
        
    
        />
      )
}

export default QuestionsModal