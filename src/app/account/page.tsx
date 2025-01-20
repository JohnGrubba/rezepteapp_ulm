import { auth } from '@/auth'
import React from 'react'

const page = async () => {
    const session = await auth()
    return (
        <div>
            <p className='text-2xl font-bold'>Hi {session?.user?.name || 'there'}!</p>
        </div>
    )
}

export default page