import getListingById from "@/app/actions/getListingById";
import EmptySpace from "@/app/components/EmptySpace";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getProducts from "@/app/actions/getProducts";
import getRatingByListingId from "@/app/actions/getRatingByListingId";
import getRatingsByListingId from "@/app/actions/getRatingsByListingId";
import getQuestionsByListingId from "@/app/actions/getQuestionsByListingId";

interface IParams{
  listingId?: string;
}
const ListingPage = async ({params}:{params: IParams}) => {
  const listing = await getListingById(params);
  const review = await getRatingByListingId(params);
  const ratings = await getRatingsByListingId(params);
  const products = await getProducts(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const questionList = await getQuestionsByListingId(params);

  if(!listing){
    return (
      <EmptySpace/>
    )
  }
  return (
    <ListingClient
      listing={listing}
      currentUser={ currentUser}
      products={ products }
      review={ review }
      questions={questionList}
      ratings={ ratings }

    />
  )
}

export default ListingPage