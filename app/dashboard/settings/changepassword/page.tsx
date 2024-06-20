import getCurrentUser from "@/app/actions/getCurrentUser"
import ChangePasswordView from "@/app/components/dashboard/sections/changePassword/ChangePasswordView"

const page = async () => {
    
const currentUser = await getCurrentUser();
 
return (
    <div>
        <ChangePasswordView header="Password Change" currentUser={currentUser}/>
    </div>
  )
}

export default page