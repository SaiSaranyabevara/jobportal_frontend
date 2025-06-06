import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/jobSlice'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Graphic Designer",
  "Full Stack Developer"
]

const CategoryCarousel = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle search job by category

 const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
  
  
  return (
    <div>
      <Carousel className={"m-full max-w-xl mx-auto my-20"}>
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem key={cat} className={"md:basis-1/2 lg-basis-1/3"}>
                <Button onClick={()=> searchJobHandler(cat)} variant={"outline"} className={"rounded-full"}>{cat}</Button>
              </CarouselItem>
            ))
          }

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

export default CategoryCarousel
