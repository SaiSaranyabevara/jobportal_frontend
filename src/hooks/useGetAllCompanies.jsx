import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setCompanies} from '@/redux/companySlice';

const useGetAllCompanies= (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
              if(res.data.success){
                dispatch(setCompanies(res.data.companies));
              }
            } catch (error) {
                // console.error('Error fetching jobs:', error);
                toast.error(error.response?.data?.message || "Failed to fetch companies");
                // Handle error appropriately, e.g., dispatch an error action or show a notification
                dispatch(setCompanies([])); // Reset companies on error
            }
        };

        fetchCompanies();
    }, []);
}

export default useGetAllCompanies


