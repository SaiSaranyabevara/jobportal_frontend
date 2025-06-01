import axios from "axios";
import  {useDispatch } from "react-redux";
import { useEffect} from "react";
import { toast } from "sonner";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import {APPLICATION_API_END_POINT} from "@/utils/constant";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log("res", res.data);
                
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                    toast.success("Applied jobs fetched successfully");
                }
            } catch (error) {
                // console.error("Error fetching applied jobs:", error);
                toast.error(error.response?.data?.message || "Failed to fetch applied jobs");
                // Handle error appropriately, e.g., dispatch an error action or show a notification
                dispatch(setAllAppliedJobs([])); // Reset applied jobs on error
            }
        };
        fetchAppliedJobs();
    }, []);
};


export default useGetAppliedJobs;