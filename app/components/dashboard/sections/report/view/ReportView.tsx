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
import { emailList } from '@/app/const/emails';

import ModalAddBuyer from '../modal/ModalAddBuyer';
import BuyerList from '../list';
import ReportTableToolbar from '../table/report-table-toolbar';
import ReportTable from '../table';
import { addDays } from 'date-fns';
import { GenerateExcel } from './GenerateExcel';

TimeAgo.addLocale(en)

// ----------------------------------------------------------------------

interface ElementProps {
  fieldOrder?:boolean;
  header:any;
  headerStyles?:any;
  data: any;
  buyerList:any;
}

const defaultSelectionRange = {
  startDate: addDays(new Date(), -7),
  endDate: new Date(),
  key: 'selection'
}

const ReportPage: React.FC<ElementProps> = ({
  fieldOrder,
  header,
  headerStyles,
  data,
  buyerList,
}) => {

  const [selected, setSelected] = useState<string[]>([]);
  const [isAddModalVisible, setisAddModalVisible] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isOrderVisible, setisOrderVisible] = useState(false);
  const [isSendVisible, setisSendVisible] = useState(false);
  const [isConfirmVisible, setisConfirmVisible] = useState(false);
  const [isSendConfirmVisible, setisSendConfirmVisible] = useState(false);
  const [selectionRange, setSelectionRange] = useState<any[]>([defaultSelectionRange]);
  
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [filterDate, setFilterDate] = useState({since: '', to:''})


  const [quotes, setQuotes] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selectedBuyer, setselectedBuyer] = useState<any[]>([]);
  const [weekLeads, setweekLeads] = useState({startDate:'',endDate:''});
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);


  const handleFilterByName = (value:any) => {
    const buyer = buyerList.filter((buyer:any)=>{
      return(buyer.email== value);
    });
    console.log(selectedBuyer);
    setselectedBuyer(buyer[0]);
    setFilterName(value);
  };

  useEffect(() => {
    if(!data){
      setNotFound(true);
      return;
    }

   
  filterQuotes();

    
  }, [filterName,selectionRange,data]);


 const filterQuotes = () =>{
  if(filterName == ""){
    setNotFound(true);
    return;
  }
  
  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(null, null),
    filterName,
  });



  let startDate = (selectionRange[0].startDate).toISOString();
  startDate = startDate.substring(0,10);
  let endDate = (selectionRange[0].endDate).toISOString();
  endDate = endDate.substring(0,10);

  setweekLeads({...weekLeads, ['startDate']:startDate,['endDate']:endDate});
  let filtered = dataFiltered.filter((product:any)=>{
   
    let productDate = product["createdAt"];
    productDate = productDate.substring(0,10);
    // console.log("-------------");
    // console.log(startDate);
    // console.log(productDate);
    // console.log(endDate);
    // console.log("-------------");
    return(productDate>= startDate &&
      productDate<= endDate);
  })

  const notFound = !filtered.length;
  setNotFound(notFound);

  setQuotes(filtered);
  
 

 }
  const router = useRouter();
  
  useEffect(() => {
    if(data?.length < 1){
      setNotFound(true);
      return;
    }
    if(filterName == ""){
      return;
    }
      setQuotes(data);
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
    setFilterDate({ ...filterDate, [field]: value });
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
  console.log(selected);
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


  const onExportQuotes= (title?: string, worksheetname?: string) => {
    console.log(quotes);
   GenerateExcel("Quotes", "QuotesExport", quotes,selectedBuyer, weekLeads);
    
  }



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

      <ReportTableToolbar
        buyerList={buyerList}
        filterDate={filterDate}
        selectionRange={selectionRange}
        setSelectionRange={setSelectionRange}
        handleInput={handleInputChange}
        onAddModalClick={handleAddClick}
        onDelete={onBatchDelete}
        onExportExcel={onExportQuotes}
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
          data={quotes}
        />

<Card className='invisible md:visible'>

        <ReportTable
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
          data={quotes}
          headerStyles={headerStyles}
        />
</Card>
     
    </Container>
    </LoadingContainer>
    
  );
}


export default ReportPage