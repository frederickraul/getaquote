import getCurrentUser from '@/app/actions/getCurrentUser copy'
import getSettingsByName from '@/app/actions/getSettingsByName';
import BusinessContactView from '@/app/components/dashboard/sections/businesscontact/BusinessContactView';
import React from 'react'

const page = async() => {
  const currentUser = await getCurrentUser();
  const business = await getSettingsByName('business');
  return (
    <div>
        <BusinessContactView header='Business Contact Information' business={business?.values[0]} currentUser={currentUser}/>
    </div>
  )
}

export default page