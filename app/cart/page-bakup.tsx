import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/ClientOnly";


import EmptySpace from "../components/EmptySpace";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptySpace
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }


  const reservations = await getReservations({ userId: currentUser.id });
  
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptySpace
          title="Your cart is empty"
          subtitle="Looks like you havent add any item."
        />
        </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
      </ClientOnly>
  );
}
 
export default TripsPage;