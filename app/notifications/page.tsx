import getCurrentUser from "@/app/actions/getCurrentUser";

import EmptySpace from "../components/EmptySpace";
import getQuestionsByUserId from "../actions/getQuestionsByUserId";
import Notifications from "./Notifications";
import getAllNotifications from "../actions/getAllNotifications";

const ListingPage = async () => {

  const notifications = await getAllNotifications();
  const currentUser = await getCurrentUser();
  const questionList = await getQuestionsByUserId();

  if (questionList?.length === 0) {
    return (
        <EmptySpace
          title="No notifications found"
          subtitle="Looks like you have no notifications right now."
        />
    );
  }

  return (
     <>
      <Notifications
        notifications={notifications}
        currentUser={currentUser}
        />
        </>
  );
}
 
export default ListingPage;