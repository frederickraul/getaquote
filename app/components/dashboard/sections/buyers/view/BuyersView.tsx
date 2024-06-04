'use client';
import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { applyFilter, getComparator } from '../utils';
import ModalConfirm from '../modal/ModalConfirm';
import ModalDetails from '../modal/ModalDetails';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ModalEdit from '../modal/ModalEdit';
import { Container } from '@mui/material';
import LoadingContainer from '@/app/components/LoadingContainer';
import ModalSend from '../modal/ModalSend';
import { emailList } from '@/app/const/emails';
import ModalSendConfirm from '../modal/ModalSendConfirm';

import QuoteTableToolbar from '../table/buyer-table-toolbar';
import ModalAddBuyer from '../modal/ModalAddBuyer';
import BuyerTable from '../table';
import BuyerList from '../list';
import BuyerTableToolbar from '../table/buyer-table-toolbar';

TimeAgo.addLocale(en)

// ----------------------------------------------------------------------

interface ElementProps {
  fieldOrder?:boolean;
  header:any;
  headerStyles?:any;
  data: any;
}

const BuyersPage: React.FC<ElementProps> = ({
  fieldOrder,
  header,
  headerStyles,
  data,
}) => {

  const [selected, setSelected] = useState<string[]>([]);
  const [isAddModalVisible, setisAddModalVisible] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isOrderVisible, setisOrderVisible] = useState(false);
  const [isSendVisible, setisSendVisible] = useState(false);
  const [isConfirmVisible, setisConfirmVisible] = useState(false);
  const [isSendConfirmVisible, setisSendConfirmVisible] = useState(false);
  
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [isLoading, setisLoading] = useState(false);


  const [buyers, setBuyers] = useState(data);
  const [filterName, setFilterName] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);


  const handleFilterByName = (event:any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  useEffect(() => {
    if(!data){
      setNotFound(true);
      return;
    }
    const dataFiltered = applyFilter({
      inputData: data,
      comparator: getComparator(null, null),
      filterName,
    });
  
    setBuyers(dataFiltered);
    const notFound = !dataFiltered.length && !!filterName;
    setNotFound(notFound);
  
    
  }, [filterName,data]);



  const router = useRouter();
  
  useEffect(() => {
    if(data?.length < 1){
      setNotFound(true);
      return;
    }
      setBuyers(data);
  }, [data])


  const handleModalClose = () =>{
    setisModalVisible(false);
  }
  const handleEditClose = () =>{
    setSelectedRow([]);
    setisEditVisible(false);
  }
  const handleConfirmModalClose = () =>{
    setisConfirmVisible(false);
  }
  const handleOrderClose = () =>{
    setisOrderVisible(false);
  }
  const handleSendClose = () =>{
    setisSendVisible(false);
  }
  const handleSendConfirmClose = () =>{
    setisSendConfirmVisible(false);
  }

  const handleAddModalClose = () =>{
    setisAddModalVisible(false);
  }
  const handleAddClick = () => {
    setisAddModalVisible(true);
  };


  const refresh = () =>{
    router.refresh();

  }

  const handleRowClick = (event:any, data:any) => {
    console.log('Row Clicked')
    console.log(data);
    setSelectedRow(data);
    setisModalVisible(true);
  };


  const handleDeleteClick = (event:any, data:any) => {
    setdeleteRowId(data.id);
    setisConfirmVisible(true);
  };

  const handleEditClick = (event:any, data:any) => {
    setSelectedRow(data);
    setisEditVisible(true);
  };


  const handleSendClick = (event:any, data:any) => {
    setSelectedRow({...data,['status']: 'processing',['buyer']: emailList[0], ['subject']:`Zeus Lead Quote`, ['pickedUp']:'?', ['droppedOff']:'?',['sign']:'Zeus'});
    setisSendVisible(true);
  };

  const handleSendConfirmClick = (event:any, data:any) => {
    setSelectedRow({...data,['status']: 'accepted',['subject']:`Zeus! Ready #${data?.noOrder}`, ['sign']:'Zeus'});
    setisSendConfirmVisible(true);
  };

  const handleOrderClick = (event:any, data:any) => {
    setSelectedRow(data);
    setisOrderVisible(true);
  };

  const handleInputChange = (field: string, value: any) => {
      console.log(value);
      setSelectedRow({ ...selectedRow, [field]: value });
  }

  const handleSelectChange = (field: string, item: any) => {
    const value = item.value;
    setSelectedRow({ ...selectedRow, [field]: value });
}

const handleCheckboxClick = (event:any, id:string) => {

  const selectedIndex = selected.indexOf(id);
  let newSelected:any = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  setSelected(newSelected);
};

const handleAddBuyer = useCallback((data:any) => {
  
    handleAddModalClose();
    setisLoading(true);
      axios.post(`/api/buyer/`, {data})
      .then(() => {
       
        toast.success('Buyer Registered!!!', {
          duration: 5000,
          position: 'top-center',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#E4A11B',
            secondary: '#fff',
          },  
        });
        
      router.refresh();
        
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setisLoading(false);
  
      })
    }, [router,data]);



  const onDelete = useCallback(() => {
    setisConfirmVisible(false);
    setisLoading(true);

    axios.delete(`/api/buyer/${deleteRowId}`)
    .then(() => {
      toast.success('Buyer deleted from de list!!!', {
        duration: 4000,
        position: 'top-center',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#E4A11B',
          secondary: '#fff',
        },  
      });
      
      router.refresh();
      
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setdeleteRowId('');
      setisLoading(false);

    })
  }, [router,deleteRowId]);

  const onBatchDelete = useCallback(() => {
    setisConfirmVisible(false);
    setisLoading(true);
    axios.delete(`/api/buyer`, {data: {ids: selected}})
    .then(() => {
      toast.success('Buyer list deleted!!!', {
        duration: 4000,
        position: 'top-center',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#E4A11B',
          secondary: '#fff',
        },  
      });
      
      setSelected([]);
     router.refresh();
      
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setisLoading(false);

    })
  }, [router,selected]);



  return (
    <LoadingContainer isLoading={isLoading}>
    <Container className='h-[70vh]'>
      <ModalConfirm 
          visible={isConfirmVisible} 
          onClose={handleConfirmModalClose} 
          action={onDelete}/>

      <ModalDetails 
          visible={isModalVisible} 
          data={selectedRow} 
          onClose={handleModalClose}/>

      <ModalEdit 
        visible={isEditVisible} 
        data={selectedRow} 
        onClose={handleEditClose}
        setisLoading={setisLoading}
        refresh={refresh}
        />

      <ModalAddBuyer 
        handleSubmit={handleAddBuyer}
        setisLoading={setisLoading}
        visible={isAddModalVisible} 
        onClose={handleAddModalClose}/>


      <Stack className='my-5' direction="row" alignItems="center" justifyContent="space-between" >
        <div className='text-2xl md:text-4xl'>
          {header}
        </div>
      </Stack>

      <BuyerTableToolbar
        onAddModalClick={handleAddClick}
        onDelete={onBatchDelete}
        numSelected={selected?.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />
    
      <BuyerList
          notFound = {notFound}
          selected={selected}
          setSelected={setSelected}
          onBatchDelete={onBatchDelete}
          handleCheckboxClick={handleCheckboxClick}
          handleRowClick={handleRowClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleOrderClick={handleOrderClick}
          handleSendClick={handleSendClick}
          handleSendConfirmClick={handleSendConfirmClick}
          data={buyers}
        />

<Card className='invisible md:visible'>

        <BuyerTable
          page={page}
          setPage={setPage}
          notFound = {notFound}
          filterName={filterName}
          selected={selected}
          setSelected={setSelected}
          onBatchDelete={onBatchDelete}
          handleCheckboxClick={handleCheckboxClick}
          handleRowClick={handleRowClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleOrderClick={handleOrderClick}
          handleSendClick={handleSendClick}
          handleSendConfirmClick={handleSendConfirmClick}
          data={buyers}
          headerStyles={headerStyles}
        />
</Card>
     
    </Container>
    </LoadingContainer>
    
  );
}


export default BuyersPage