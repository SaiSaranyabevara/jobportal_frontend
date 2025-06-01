import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { User2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'  // Adjust import based on your setup
import { Link, Links } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'

import { setUser } from '@/redux/authSlice'
const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.status === 200) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);

            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);

        }
    }

    return (
        <div className='bg-white'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold '>
                        Job<span className='text-[#F83002]'>Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ?
                                (
                                    <>
                                        <li ><Link to="/" >Companies</Link></li>
                                        <li ><Link to="/admin/jobs"  >Jobs</Link></li>

                                    </>
                                ) :
                                (
                                    <>
                                        <li ><Link to="/" >Home</Link></li>
                                        <li ><Link to="/jobs"  >Jobs</Link></li>
                                        <li><Link to="/browse" >Browser</Link></li>


                                    </>
                                )
                        }

                    </ul>
                    {
                        !user ? (
                            <div>
                                <Link to='/login' > <Button variant={'outline'} >Login</Button> </Link>
                                <Link to='/signup'>  <Button className='bg-[#6A38C2] hover:bg-[#8765c1]' >Signup</Button> </Link>
                            </div>
                        ) :
                            (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto}  className='w-10 h-10 rounded-full' />
                                        </Avatar>
                                    </PopoverTrigger>

                                    <PopoverContent className='w-80'>
                                        <div className='bg-gray-100 p-4 rounded-t-md'>


                                            <div className='flex gap-4 space-y-2'>
                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src={user?.profile?.profilePhoto} className='w-10 h-10 rounded-full' />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullName}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>

                                            <div className='flex flex-col  my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit  items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to='/profile'>View Profile</Link> </Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
