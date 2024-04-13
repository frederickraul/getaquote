import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';




interface ReviewsProps {
  size?: number;
  value?:number;
  color?:string;
}

const StyledRating: React.FC<ReviewsProps> = ({
  size,
  value,
  color,
  
}) => {



const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: color ? color : '#000',
          fontSize: size ? size : 13,
        },
        '& .MuiRating-iconEmpty': {
          fontSize: size ? size : 13,
        },
        '& .MuiRating-iconHover': {
          color: '#444',
        },
      });

  return (
    <div>
         <StyledRating
                  readOnly
                  defaultValue={value || 0}
                  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.5}
                  //icon={<AiFillStar fontSize="inherit" />}
                  emptyIcon={<AiOutlineStar fontSize="inherit" />}
                  />
    </div>
  )
}

export default StyledRating