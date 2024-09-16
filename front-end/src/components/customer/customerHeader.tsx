import React from 'react'
import { IoNotifications} from '@/components/icons/index'

interface Props {
    children?: React.ReactNode;
}


const customerHeader: React.FC<Props> = ({ children }) => {
    return (
        <div className='w-full bg-primaryColor h-[40px] flex items-center px-[2%] justify-between'>
            <div className='flex items-center gap-[1rem]'>
                {children}
            </div>
            <div>
                <IoNotifications className='text-[18px] text-white' />
            </div>
        </div>
    )
}

export default customerHeader
