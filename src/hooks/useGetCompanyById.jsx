import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
              if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
              }
            } catch (error) {
                // console.error('Error fetching jobs:', error);
                toast.error(error.response?.data?.message || "Failed to fetch company");
                // Handle error appropriately, e.g., dispatch an error action or show a notification
                dispatch(setSingleCompany(null)); // Reset company data on error
            }
        };

        fetchSingleCompany();
    }, [companyId, dispatch]);
}

export default useGetCompanyById


