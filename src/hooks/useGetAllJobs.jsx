// import { JOB_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import { setAllJobs } from '@/redux/jobSlice';
// import {useEffect} from 'react'
// import { useDispatch,useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const useGetAllJobs = () => {
//     const dispatch = useDispatch();
   
//      const {searchedQuery} = useSelector(store => store.job); // ✅ check if searchedQuery is set
   
//     useEffect(() => {
//         // If user is not logged in, do not fetch jobs
//         const fetchAllJobs = async () => {
//              if (!searchedQuery || searchedQuery.trim() === '') {
//       // Option 1: fetch all jobs without keyword param
//       // or Option 2: just dispatch empty jobs or skip fetch
//       dispatch(setAllJobs([])); 
//       return;
//     }
//             try {
                
//                 const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
//               if(res.data.success){
//                 dispatch(setAllJobs(res.data.jobs));
//               }
//             } catch (error) {
//                 // console.error('Error fetching jobs:', error);
//                 toast.error(error.response?.data?.message || "Failed to fetch jobs");
//                 // Handle error appropriately, e.g., dispatch an error action or show a notification
//                 dispatch(setAllJobs([])); // Reset jobs on error
//             }
//         };

//         fetchAllJobs();
//     }, [searchedQuery]); // ✅ add searchedQuery as a dependency to refetch when it changes
// }

// export default useGetAllJobs

import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setAllJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);
  const user = useSelector(store => store.auth?.user); // 👈 adjust based on your auth slice

  useEffect(() => {
    // 🛑 Do not fetch if user is not authenticated
    if (!user) {
      dispatch(setAllJobs([]));
      return;
    }

    const fetchAllJobs = async () => {
      try {
        let url = `${JOB_API_END_POINT}/get`;
        if (searchedQuery && searchedQuery.trim() !== '') {
          url += `?keyword=${encodeURIComponent(searchedQuery.trim())}`;
        }

        const res = await axios.get(url, { withCredentials: true });

        if (res.data.success) {
          const jobs = res.data.jobs || res.data.application || [];
          dispatch(setAllJobs(jobs));
        } else {
          dispatch(setAllJobs([]));
          toast.error(res.data.message || 'Failed to fetch jobs');
        }
      } catch (error) {
        dispatch(setAllJobs([]));
        if (error.response?.status !== 401) {
          toast.error(error.response?.data?.message || 'Failed to fetch jobs');
        }
        // optional: silently ignore 401s
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch, user]);
};

export default useGetAllJobs;
