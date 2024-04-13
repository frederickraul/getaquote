'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import useConfirmModal from "../hooks/useConfirmModal";
import ConfirmModal from "../components/modals/ConfirmModal";

interface PropertiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if(listings.length > 0){
      setIsLoading(false);
     }
     
  }, [listings]);


  const confirmModal = useConfirmModal();

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios.delete(`/api/listings/${deletingId}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
      setIsLoading(false);
    })
  }, [router,deletingId]);

  const openConfirmModal = (id: string) =>{
      confirmModal.onOpen();
        setDeletingId(id);
  }

  const editButtonHandler = (id: string) => {
    setIsLoading(true);
    router.push(`/mylistings/${id}`);
  }

  return ( 
    <Container  isLoading={isLoading}>
     <div className="mt-0 sm:mt-5 md:mt-0 mb-5">
     <Heading
        title="Listings"
        subtitle="List of your listings"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-5
          gap-8
          mb-10
          pb-10
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onEditAction={editButtonHandler}
            onAction={onDelete}
            onActionSecond={openConfirmModal}
            disabled={isLoading}
            actionLabel="Edit"
            actionLabelSecond="Delete listing"
            currentUser={currentUser}
          />
        ))}

              <ConfirmModal
                onSubmit={onDelete}
                title='Are you sure you want to delete your listing?'
                body=' '
              />
      </div>
     </div>
    </Container>
   );
}
 
export default PropertiesClient;