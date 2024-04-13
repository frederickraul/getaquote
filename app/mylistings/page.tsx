export const dynamic = 'auto'

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";
import EmptySpace from "../components/EmptySpace";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptySpace
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
        <EmptySpace
          title="No listings found"
          subtitle="Looks like you have no listings."
        />
    );
  }

  return (
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
  );
}
 
export default PropertiesPage;