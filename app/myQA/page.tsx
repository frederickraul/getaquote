import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import EmptySpace from "../components/EmptySpace";
import getFavoriteProducts from "../actions/getFavoriteProducts";
import CustomersQAClient from "./MyQAClient";
import getQuestionsByOwnerId from "../actions/getQuestionsByOwnerId";
import getQuestionsByUserId from "../actions/getQuestionsByUserId";
import MyQAClient from "./MyQAClient";

const ListingPage = async () => {

  const listings = await getFavoriteListings();
  const products = await getFavoriteProducts();
  const currentUser = await getCurrentUser();
  const questionList = await getQuestionsByUserId();

  if (questionList?.length === 0) {
    return (
        <EmptySpace
          title="No questions found"
          subtitle="Looks like you have no questions to answer right now."
        />
    );
  }

  return (
     <>
      <MyQAClient
        listings={listings}
        products={products}
        currentUser={currentUser}
        questions={questionList}
        />
        </>
  );
}
 
export default ListingPage;