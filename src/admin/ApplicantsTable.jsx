import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortListingStatus=['Accepted','Rejected'];
const ApplicantsTable = () => {
  const {applicants} = useSelector(store => store.application);

  const statusHandler = async (status,id) =>{
    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with the request
      const res =await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
      toast.success(res.data.message);

    } catch (error) {
      // console.error("Error updating status:", error);
      toast.error(error.response.data.message || "Failed to update status");
      
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>
          A list of applicants for the job.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant Name</TableHead>
            <TableHead>Email</TableHead>
             <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
            </TableHeader>
          <TableBody>
            {
              applicants && applicants?.applications?.map((item)=>
              (
                <tr key={item._id}>
               <TableCell>{item?.applicant?.fullName}</TableCell>
              <TableCell>{item?.applicant?.email} </TableCell>
              <TableCell>{item?.applicant?.phoneNumber} </TableCell>
              <TableCell> 
                {
                  item?.applicant?.profile?.resume ?  <a  className={"text-blue-600 cursor-pointer"} href={item?.applicant?.profile?.resume}  target="_blank" rel="no reference">  {item?.applicant?.profile?.resumeOriginalName} </a> :<span>NA</span>
                }
               </TableCell>
              <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal/>
                  </PopoverTrigger>
                  <PopoverContent className={"w-32"}>

                 
                {
                  shortListingStatus.map((status, index) => {
                    return (
                      <div onClick={() => statusHandler(status, item?._id)}
                        key={index}
                        className={`flex w-fit items-center my-2 cursor-pointer`}
                      >
                     <span> {status}</span>  
                      </div>
                    )
                  }
                )
                }
                   
                  </PopoverContent>
                </Popover>
                 </TableCell>
                
            </tr>
              ))
            }
            
          </TableBody>
      
      </Table>
    </div>
  )
}

export default ApplicantsTable