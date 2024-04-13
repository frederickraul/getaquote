import getListingById from "@/app/actions/getListingById";
import EmptySpace from "@/app/components/EmptySpace";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import getProducts from "@/app/actions/getProducts";

interface IParams{
  listingId?: string;
}
const ListingPage = async ({params}:{params: IParams}) => {
  const listing = await getListingById(params);
  const products = await getProducts(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return <EmptySpace
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  if (listing?.userId !== currentUser.id) {
    return <EmptySpace
      title="Unauthorized"
      subtitle=""
    />
  }
  
  if(!listing){
    return (
      <EmptySpace/>
    )
  }


  return (
    <ListingClient
      listing={listing}
      products={products}
      currentUser={currentUser}
    />
  )
}

export default ListingPage