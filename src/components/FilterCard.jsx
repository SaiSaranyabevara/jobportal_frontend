import React, { useEffect } from 'react'
import { RadioGroup,RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData=[
  {
    filterType:"Location",
    array:["Delhi","Banglore","Hyderabad","Gurugram","Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","Full Stack Developer","Data Scientist","Data Analyst"]
  },
  {
    filterType:"Salary",
    array:["1 LPA - 5 LPA","5 LPA - 10 LPA","10 LPA - 20 LPA","20 LPA and above"]
  }
  ,
  {
    filterType:"Job Type",
    array:["Full-Time","Part-Time","Internship","Remote"]
  }
]
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
    // console.log("Selected Value:", value);

  }
useEffect(()=>{
   dispatch(setSearchedQuery(selectedValue));
},[selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup onValueChange={changeHandler} value={selectedValue} className='mt-3'>
        {
          filterData.map((data,index)=>(
            <div key={data.filterType || index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId = `id${index}-${idx}`
                  return(
                    <div className='flex items-center space-x-2 my-2 ' key={item || index}>
                        <RadioGroupItem value={item} id={itemId}/>
                        <Label htmlFor={itemId}>{item}</Label>
                      </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
      </div>
  )
}

export default FilterCard
