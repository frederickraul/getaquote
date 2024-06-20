import getCurrentUser from '@/app/actions/getCurrentUser copy'
import ProfileView from '@/app/components/dashboard/sections/profile/ProfileView'
import React from 'react'

const page = async() => {
  const currentUser = await getCurrentUser();
  return (
    <div>
        <ProfileView header='My Profile' currentUser={currentUser}/>
    </div>
  )
}

export default page