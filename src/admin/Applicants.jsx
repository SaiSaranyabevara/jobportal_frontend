import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
const params = useParams();
const dispatch = useDispatch();
const {applicants} =useSelector(store => store.application);
  useEffect(() =>  {
    const fetchAllApplicants = async ()=>{
      try {
        const res =await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
        // console.log("res",res.data);
          dispatch(setAllApplicants(res.data.job));
        
     
      } catch (error) {
        // console.error("Error fetching applicants:", error);
        res.status(500).json({ error: error.message });
      }
    }
    fetchAllApplicants();
  },[])

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto p-5'>
            <h1 className='font-bold text-1xl my-5'>
Applicants {applicants?.applications?.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants