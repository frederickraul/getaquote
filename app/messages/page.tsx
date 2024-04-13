import getCurrentUser from "@/app/actions/getCurrentUser";

import EmptySpace from "../components/EmptySpace";
import getQuestionsByUserId from "../actions/getQuestionsByUserId";
import Notifications from "./Messages";
import getAllNotifications from "../actions/getAllNotifications";
import Messages from "./Messages";
import getChats from "../actions/getChats";
import getNotificationsByType from "../actions/getNotificationsByType";

const MessagesPage = async () => {

  const chats = await getChats();
  const currentUser = await getCurrentUser();

  return (
     <>
      <Messages
        chats={chats}
        currentUser={currentUser}
        />
        </>
  );
}
 
export default MessagesPage;