import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import EmptySpace from "../components/EmptySpace";
import getFavoriteProducts from "../actions/getFavoriteProducts";
import CustomersQAClient from "./CustomersQAClient";
import getQuestionsByOwnerId from "../actions/getQuestionsByOwnerId";

const ListingPage = async () => {

  const listings = await getFavoriteListings();
  const products = await getFavoriteProducts();
  const currentUser = await getCurrentUser();
  const questionList = await getQuestionsByOwnerId();

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
      <CustomersQAClient
        listings={listings}
        products={products}
        currentUser={currentUser}
        questions={questionList}
        />
        </>
  );
}
 
export default ListingPage;