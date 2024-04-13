import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient";
import EmptySpace from "../components/EmptySpace";
import getFavoriteProducts from "../actions/getFavoriteProducts";

const ListingPage = async () => {

  const listings = await getFavoriteListings();
  const products = await getFavoriteProducts();
  const currentUser = await getCurrentUser();

  if (listings.length === 0 && products.length === 0) {
    return (
        <EmptySpace
          title="No favorites found"
          subtitle="Looks like you have no favorite listings or products."
        />
    );
  }

  return (
     <>
      <FavoritesClient
        listings={listings}
        products={products}
        currentUser={currentUser}
        />
        </>
  );
}
 
export default ListingPage;