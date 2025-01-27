"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

const SignIn = () => {
    return (
        <div>
            <Button onClick={(e) => {
                signIn()
            }} variant="outline">Sign In</Button>
        </div>
    )
}

export default SignIn