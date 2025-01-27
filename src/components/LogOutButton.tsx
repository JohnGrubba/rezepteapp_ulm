"use client"
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const LogOutButton = () => {
    return (
        <Button onClick={() => {
            signOut()
        }} variant="outline"><LogOut /></Button>

    )
}

export default LogOutButton