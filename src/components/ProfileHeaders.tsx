import type React from "react"
import type { User } from "next-auth"
import LogOutButton from "./LogOutButton"

interface ProfileHeaderProps {
    user: User | undefined
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 mb-8">
                <img src={user?.image || ""} width={64} className='rounded-full' alt="Profile" />

                <div>
                    <h1 className="md:text-3xl text-xl font-bold">Hi, {user?.name}</h1>
                    <p className="text-muted-foreground">Welcome to your recipe collection</p>
                </div>
            </div>
            <LogOutButton />
        </div>

    )
}

export default ProfileHeader

