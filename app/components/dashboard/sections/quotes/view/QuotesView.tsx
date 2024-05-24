'use client';
import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from '../../../_mock/user';

import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import ModalConfirm from './ModalConfirm';
import ModalDetails from './ModalDetails';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ModalEdit from './ModalEdit';
import ModalOrder from './ModalOrder';
import { Container } from '@mui/material';
import LoadingContainer from '@/app/components/LoadingContainer';
import { usePathName } from '../../../routes/hooks/usePathName';
import ModalSend from './ModalSend';
import { emailList } from '@/app/const/emails';
import ModalSendConfirm from './ModalSendConfirm';
import { sellTypeList } from '@/app/const/sellType';

TimeAgo.addLocale(en)

// ----------------------------------------------------------------------

interface ListingCardProps {
  fieldOrder?:boolean;
  header:any;
  headerStyles?:any;
  data: any;
}

const QuotesPage: React.FC<ListingCardProps> = ({
  fieldOrder,
  header,
  headerStyles,
  data,
}) => {

  let tableHeader = [
    { id: 'OrderNo', label: 'Order' },
    { id: 'vin', label: 'VIN' },
    { id: 'year', label: 'Year' },
    { id: 'make', label: 'Make' },
    { id: 'model', label: 'Model' },
    { id: 'engine', label: 'Engine' },
    { id: 'phone', label: 'Phone' },
    { id: 'date', label: 'Date' },
    { id: '' },
  ];

  // if(fieldOrder){
  //   tableHeader = [
  //     { id: 'OrderNo', label: 'Order No' },
  //     { id: 'vin', label: 'VIN' },
  //     { id: 'year', label: 'Year' },
  //     { id: 'make', label: 'Make' },
  //     { id: 'model', label: 'Model' },
  //     { id: 'engine', label: 'Engine' },
  //     { id: 'phone', label: 'Phone' },
  //     { id: 'date', label: 'Date' },
  //     { id: '' },
  //   ];
  // }
  const [page, setPage] = useState(0);


  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState('createdAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [quotes, setQuotes] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isOrderVisible, setisOrderVisible] = useState(false);
  const [isSendVisible, setisSendVisible] = useState(false);
  const [isConfirmVisible, setisConfirmVisible] = useState(false);
  const [isSendConfirmVisible, setisSendConfirmVisible] = useState(false);
  1
  const [selectedRow, setSelectedRow] = useState({id:'',price:'',price2:'',status:'',noOrder:'',buyerEmail:'',sellType: '',buyer:{label:'',name:'',value:''}});
  const [deleteRowId, setdeleteRowId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [noOrderError, setnoOrderError] = useState(false);

  const router = useRouter();
  

  useEffect(() => {
    if(!data){
      return;
    }
      setQuotes(data);
  }, [data])


  const handleModalClose = () =>{
    setisModalVisible(false);
  }
  const handleEditClose = () =>{
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

  const handleSort = (event:any, id:any) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event:any) => {
    if (event.target.checked) {
      const newSelecteds = quotes.map((n:any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event:any, data:any) => {
    
    const role = event;
    if(role == "checkbox"){
      return;
    }
    setSelectedRow(data);
    setisModalVisible(true);
  };

  const handleClick = (event:any, id:any) => {
 
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


  const onDelete = useCallback(() => {
    setisConfirmVisible(false);
    setisLoading(true);

    axios.delete(`/api/cars/${deleteRowId}`)
    .then(() => {
      toast.success('Quote deleted!!!', {
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
    axios.delete(`/api/cars`, {data: {ids: selected}})
    .then(() => {
      toast.success('Quote list deleted!!!', {
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

  const onBatchChangeStatus = useCallback((status:string) => {
    setisConfirmVisible(false);
    setisLoading(true);
    axios.post(`/api/cars/changestatus/`, {ids: selected, status:status})
    .then(() => {
      toast.success('Quote list updated!!!', {
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

  const onSendEmail = useCallback(() => {
    if(selectedRow.buyer.value === ''){
      return
    }

    setisSendVisible(false);
    setisLoading(true);
    axios.post(`/api/email/send/`, {data:selectedRow})
    .then(() => {
      axios.post(`/api/cars/changestatus/`, {ids: [selectedRow.id], status:'processing',buyerName:'', buyerEmail:selectedRow?.buyerEmail}).then(()=>{
        router.refresh();
      });
      toast.success('Email sended!!!', {
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
      setisLoading(false);

    })
  }, [router,selectedRow]);

  const onSendEmailConfirm = useCallback(() => {
    if(selectedRow.buyerEmail === ''){
      return
    }

    if(selectedRow.noOrder === '' || selectedRow.sellType === null){
      toast.success('Add a order number before sending a confirm email!!!', {
        duration: 8000,
        position: 'top-center',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#FF0000',
          secondary: '#fff',
        },  
      });

     setisSendConfirmVisible(false);
     setisOrderVisible(true);
      return;
    }

    setisSendConfirmVisible(false);
    setisLoading(true);
    axios.post(`/api/email/confirm/`, {data:selectedRow})
    .then(() => {
      axios.post(`/api/cars/changestatus/`, {ids: [selectedRow.id], status:'accepted'}).then(()=>{
        router.refresh();
      });
      toast.success('Confirm Email sended, quote moved to accepted list!!!', {
        duration: 8000,
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
  }, [router,selectedRow]);


const handleOrderSubmit = useCallback(() => {
  setnoOrderError(false);

  if(selectedRow.noOrder === null || selectedRow.sellType === null || selectedRow.price === null || selectedRow.price2 === null){
    setnoOrderError(true);
    return;
  }

  if(selectedRow.noOrder === "" || selectedRow.price === "" || selectedRow.price2 === ""){
    setnoOrderError(true);
    return;
  }

  setisOrderVisible(false);
  setisLoading(true);
  const quoteId = selectedRow?.id;
  axios.post(`/api/cars/changeorderno/${quoteId}`,selectedRow)
  .then(() => {
    toast.success("Order number updated!!!", {
      duration: 5000,
      position: 'top-center',
    
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#54B4D3',
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
}, [router,selectedRow]);


  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

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
    comparator: getComparator(order, orderBy),
    filterName,
  });

  setQuotes(dataFiltered);
  const notFound = !dataFiltered.length && !!filterName;
  setNotFound(notFound);

  
}, [filterName]);


  return (
    <LoadingContainer isLoading={isLoading}>
    <Container>
      <ModalConfirm 
          visible={isConfirmVisible} 
          onClose={handleConfirmModalClose} 
          action={onDelete}/>

      <ModalDetails 
          visible={isModalVisible} 
          data={selectedRow} 
          onClose={handleModalClose}/>

      <ModalEdit 
        handleInput={handleInputChange}  
        visible={isEditVisible} 
        data={selectedRow} 
        onClose={handleEditClose}/>

      <ModalOrder 
        error={noOrderError}
        handleSubmit={handleOrderSubmit} 
        handleInput={handleInputChange} 
        handleSelect={handleSelectChange} 
        visible={isOrderVisible} 
        data={selectedRow} 
        onClose={handleOrderClose}/>

      <ModalSend 
         visible={isSendVisible} 
         data={selectedRow} 
         handleInput={handleInputChange} 
         handleSubmit={onSendEmail} 
         onClose={handleSendClose}/>

      <ModalSendConfirm
         visible={isSendConfirmVisible} 
         data={selectedRow} 
         handleInput={handleInputChange} 
         handleSubmit={onSendEmailConfirm} 
         onClose={handleSendConfirmClose}/>


      <Stack className='my-5' direction="row" alignItems="center" justifyContent="space-between" >
        <Typography variant="h4">
          {header}
        </Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          onDelete={onBatchDelete}
          onChangeStatus={onBatchChangeStatus}
          numSelected={selected?.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                
                styles={headerStyles}
                order={order}
                orderBy={orderBy}
                rowCount={quotes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={tableHeader}
              />
              <TableBody>
                {quotes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row:any) => (
                    <UserTableRow
                      fieldOrder
                      key={row.id}
                      data={row}
                      selected={selected?.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      handleRowClick={(event) => handleRowClick(event, row)}
                      handleEditClick={(event) => handleEditClick(event, row)}
                      handleDeleteClick={(event) => handleDeleteClick(event, row)}
                      handleOrderClick={(event) => handleOrderClick(event, row)}
                      handleEmailClick={(event) => handleSendClick(event, row)}
                      handleSendConfirmClick={(event) => handleSendConfirmClick(event, row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
          </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={quotes.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25,50,100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
    </LoadingContainer>
    
  );
}


export default QuotesPage