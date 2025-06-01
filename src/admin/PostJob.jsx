import Navbar from '@/components/shared/Navbar'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const companyArray=[];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        jobType: "",
        position: 0,
        experience: "",
        location: "",
        salary: "",
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const {companies} = useSelector(store=>store.company);
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler =(value)=>{
        const selectedCompanies = companies.find((company)=> company.name.toLowerCase() ===value);
        setInput({...input, companyId: selectedCompanies._id});
    }

    const submitHandler = async(e) => {
            e.preventDefault();
            if (companies.length === 0) {
                return;
            }
           try {
                setLoading(true);
                const ress=await axios.post(`${JOB_API_END_POINT}/post`,input,{
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                if(ress.data.success){
                    toast.success("Job posted successfully");
                     navigate("/admin/jobs");
                }

           } catch (error) {
            //    console.error("Error posting job:", error);
                toast.error("Failed to post job. Please try again.");
           }
           finally {
                setLoading(false);
            }
    }

    return (
        <div>
            <Navbar />
            <div className='flex  items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'> 
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label>Title</Label>
                        <Input
                            type='text'
                            name='title'
                            value={input.title}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type='text'
                            name='description'
                            value={input.description}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input
                            type='text'
                            name='requirements'
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                     <div>
                        <Label>Salary</Label>
                        <Input
                            type='text'
                            name='salary'
                            value={input.salary}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                     <div>
                        <Label>Location</Label>
                        <Input
                            type='text'
                            name='location'
                            value={input.location}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                     <div>
                        <Label>JobType</Label>
                        <Input
                            type='text'
                            name='jobType'
                            value={input.jobType}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                     <div>
                        <Label>Experience Level</Label>
                        <Input
                            type='text'
                            name='experience'
                            value={input.experience}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                      <div>
                        <Label>No of Positions</Label>
                        <Input
                            type='number'
                            name='position'
                            value={input.position}
                            onChange={changeEventHandler}
                            className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                        />
                    </div>
                    {
                        companies.length >0 && (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className={"w-{180px}"}>
                                    <SelectValue placeholder={'select a company'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            companies.map((company)=>{
                                                return (
                                                    <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                )
                                            })
                                        }
                                       
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }
                </div>
                   {   loading ? <Button className={"w-full my-4 cursor-pointer"}><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className={"w-full my-4 cursor-pointer"} >Post New Job</Button>}
                    
   
                {
                    companies.length ===0 &&  <p className='text-xs text-red-600 font-bold text-center my-3'>Please registerr a company before posting a job</p>
                } </form>

            </div>


        </div>
    )
}

export default PostJob