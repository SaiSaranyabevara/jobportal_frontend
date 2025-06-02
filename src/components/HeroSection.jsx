import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
  const [query, setQuery] =useState("");
  const dispatch = useDispatch();
const navigate = useNavigate();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] fornt-medium'> No.1 Job Hunt Website </span>
         <h1 className='text-5xl font-bold'>Search ,Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
         <p>Discover your dream tech job with ease — explore verified openings in Full Stack, Data Analytics, Design, and more. 
         </br>
Connect with top companies, apply instantly, and take the next step in your career journey.</p>
       <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
        <input type="text"
         placeholder='find your dream jobs' 
         onChange={(e) => setQuery(e.target.value)}
          value={query}
         className='outline-none border-none w-full' />
      <Button onClick={searchJobHandler} className={"rounded-r-full bg-[#6A38C2] hover:bg-[#9e74e1] "}><Search className='h-5 w-5'/></Button>
      
       </div>
       
        </div>
          </div>
  )
}

export default HeroSection
