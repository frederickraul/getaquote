import getCurrentUser from "@/app/actions/getCurrentUser";

import EmptySpace from "../../components/EmptySpace";
import getQuestionsByUserId from "../../actions/getQuestionsByUserId";
import getAllNotifications from "../../actions/getAllNotifications";
import MessageClient from "./MessageClient";
import getProductById from "@/app/actions/getProductById";
import getChatById from "@/app/actions/getChatById";

interface IParams{
  chatId?: string;
}

const MessagePage = async ({params}:{params: IParams}) => {

  const notifications = await getAllNotifications();
  const currentUser = await getCurrentUser();
  const chat = await getChatById(params);
  
  if (!currentUser) {
    return <EmptySpace
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  if (currentUser.id != chat?.userId && currentUser.id != chat?.recipientId) {
    return <EmptySpace
      title="Unauthorized"
      subtitle=""
  />
  }

  return (
     <>
      <MessageClient
        chat={chat}
        product={chat?.product}
        messages={chat?.messages}
        recipient={chat?.recipient}
        currentUser={currentUser}
        />
        </>
  );
}
 
export default MessagePage;