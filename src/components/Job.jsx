import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({job}) => {
    const navigate = useNavigate();
    // 
    const daysAgoFunction = (mongodbTime)=>{
        const createdAt=new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference=currentTime-createdAt;
        return Math.floor(timeDifference/(1000*24*60*60))
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>

           
            <p className='text-sm text-gray-500' >{daysAgoFunction(job?.createdAt) === 0?"Today" : `${daysAgoFunction(job?.createdAt)}days ago`}</p>
            <Button variant={"outline"} className={"rounded-full"} size={"icon"}><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo}></AvatarImage>           </Avatar>
                </Button>
<div>
    <h1 className='font-medium text-lg'>{job?.company?.name} </h1>
    <p className='text-sm text-gray-500' >{job?.company?.location}</p>
</div>
            </div>
<div>
    <h1 className='font-bold text-lg my-2'>{job?.title} </h1>
    <p className='text-sm text-gray-600'>{job?.description}</p>
</div>
<div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold ' variant={"ghost"}>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold ' variant={"ghost"}>{job?.jobType} </Badge>
                <Badge className='text-[#7209b7] font-bold ' variant={"ghost"}>{job?.salary} LPA</Badge>

            </div>
    <div className='flex items-center gap-2 mt-4'>
        <Button onClick={()=> navigate(`/description/${job?._id}`)} variant={"outline"} >Details</Button>
        <Button className={"bg-[#7209b7] "}>Save For Later</Button>
    </div>

        </div>
    )
}

export default Job


// data:image/jpeg;base64,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 " />
         