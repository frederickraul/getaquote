'use client';

import BarRating from "@/app/components/BarRating";
import CircleRating from "@/app/components/CircleRating";
import StyledRating from "@/app/components/StyledRating";
import { ratingData as percents } from "@/app/const/rating";
import { colors } from "@/app/const/theme";
import { Value } from "@prisma/client/runtime/library";
import { useEffect, useState } from "react";
import { BiSolidUser } from "react-icons/bi";

interface RatingProps{
  ratings?: any;
  getRatingAverage?:(value: number)=>void;

}

const Rating: React.FC<RatingProps> = ({
  ratings,
  getRatingAverage
}) => {
  
  const count = ratings?.length || 0;

  const [ratingAvg, setRatingAvg] = useState(0);
  const [teamAvg, setTeamAvg] = useState(0);
  const [ratingData, setRatingData] = useState(percents);

  useEffect(() => {
    const calculateAvg = () => {
      // Sum the skillset ratings
      const setRatingSum = ratings.reduce((sum:any, ratingObj:any) => {
        
        return sum + Number(ratingObj.rating);
      }, 0);

      const set1Stars = ratings.reduce((sum:any, ratingObj:any) => {
        if(Number(ratingObj.rating) == 1){
          sum++;
        }
        return sum;
      }, 0);
      const set2Stars = ratings.reduce((sum:any, ratingObj:any) => {
        if(Number(ratingObj.rating) == 2){
          sum++;
        }
        return sum;
      }, 0);
      const set3Stars = ratings.reduce((sum:any, ratingObj:any) => {
        if(Number(ratingObj.rating) == 3){
          sum++;
        }
        return sum;
      }, 0);
      const set4Stars = ratings.reduce((sum:any, ratingObj:any) => {
        if(Number(ratingObj.rating) == 4){
          sum++;
        }
        return sum;
      }, 0);
      const set5Stars = ratings.reduce((sum:any, ratingObj:any) => {
        if(Number(ratingObj.rating) == 5){
          sum++;
        }
        return sum;
      }, 0);


      // Determine the averages
      const RatingAvg = setRatingSum / ratings?.length;


  
      // Set the string values in state to render
      setRatingAvg(RatingAvg);
      getRatingAverage && getRatingAverage(RatingAvg);

      let items = ratingData;
      items[4].height = (set1Stars * 100 / ratings.length);
      items[3].height = (set2Stars * 100 / ratings.length);
      items[2].height = (set3Stars * 100 / ratings.length);
      items[1].height = (set4Stars * 100 / ratings.length);
      items[0].height = (set5Stars * 100 / ratings.length);

      setRatingData(items);
    };
    
    if (ratings?.length > 0) {
      calculateAvg();
   
    } else {

      setRatingAvg(0);
      getRatingAverage && getRatingAverage(0);
      setRatingData([]);
    }
  }, [ratings]);


  return (
    <div className="flex flex-row mt-4 w-full mb-10">
      <div className="flex flex-row w-1/3 items-center justify-center">
        
           <CircleRating count={count} average={ratingAvg}/>
      </div>
      <div className="flex flex-col w-3/4 sm:full justify-center items-center ml-4 sm:ml-0">
            <BarRating data={ratingData} factor={4}/>
      </div>

          </div>
  )
}

export default Rating