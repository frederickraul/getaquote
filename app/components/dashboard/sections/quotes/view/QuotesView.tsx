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
import ModalOrder from '../modal/ModalOrder';
import { Container } from '@mui/material';
import LoadingContainer from '@/app/components/LoadingContainer';
import ModalSend from '../modal/ModalSend';
import ModalSendConfirm from '../modal/ModalSendConfirm';
import QuoteTable from '../table';
import QuoteTableToolbar from '../table/quote-table-toolbar';
import QuoteList from '../list';
import ModalMultipleSend from '../modal/ModalMultipleSend';


TimeAgo.addLocale(en)

// ----------------------------------------------------------------------

interface ListingCardProps {
  fieldOrder?: boolean;
  header: any;
  headerStyles?: any;
  data: any;
  buyers?: any;
}

const QuotesPage: React.FC<ListingCardProps> = ({
  fieldOrder,
  header,
  headerStyles,
  data,
  buyers,
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

  const defaultSelectedRow = { id: '', price: '', price2: '', status: '', city: '', state: '', zip: '', noOrder: '', buyerEmail: '', buyerName: '', sellType: '', address: '', buyer: { label: '', name: '', value: '' } };
  const [selected, setSelected] = useState<string[]>([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isEditVisible, setisEditVisible] = useState(false);
  const [isOrderVisible, setisOrderVisible] = useState(false);
  const [isSendVisible, setisSendVisible] = useState(false);
  const [isConfirmVisible, setisConfirmVisible] = useState(false);
  const [isSendConfirmVisible, setisSendConfirmVisible] = useState(false);
  const [isMultipleSendVisible, setisMultipleSendVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState(defaultSelectedRow);
  const [deleteRowId, setdeleteRowId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [noOrderError, setnoOrderError] = useState(false);

  const [quotes, setQuotes] = useState(data)
  const [filterName, setFilterName] = useState('');
  const [notFound, setNotFound] = useState(true);
  const [page, setPage] = useState(0);

  const handleZipcodeChange = (value: any) => {
    setSelectedRow({ ...selectedRow, ['city']: value.city, ['state']: value.state_name, ['zip']: value.zip });
  }

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  useEffect(() => {
    if (data?.length < 1) {
      setNotFound(true);
      return;
    }


    const dataFiltered = applyFilter({
      inputData: data,
      comparator: getComparator(null, null),
      filterName,
    });

    setQuotes(dataFiltered);
    const notFound = !dataFiltered.length && !!filterName;
    setNotFound(notFound);


  }, [filterName, data]);



  const router = useRouter();



  const refresh = () => {
    router.refresh();
  }

  const handleModalClose = () => {
    setisModalVisible(false);
  }
  const handleEditClose = () => {
    setisEditVisible(false);
  }
  const handleConfirmModalClose = () => {
    setisConfirmVisible(false);
  }
  const handleOrderClose = () => {
    setisOrderVisible(false);
  }
  const handleSendClose = () => {
    setisSendVisible(false);
  }
  const handleSendConfirmClose = () => {
    setisSendConfirmVisible(false);
  }
  const handleMultipleSendClose = () => {
    setisMultipleSendVisible(false);
  }





  const handleRowClick = (event: any, data: any) => {

    setSelectedRow(data);
    setisModalVisible(true);
  };


  const handleDeleteClick = (event: any, data: any) => {

    setdeleteRowId(data.id);
    setisConfirmVisible(true);
  };

  const handleEditClick = (event: any, data: any) => {
    setSelectedRow(data);
    setisEditVisible(true);
  };


  const handleSendClick = (event: any, data: any) => {
    setSelectedRow({ ...data, ['status']: 'processing', ['buyer']: buyers[0], ['subject']: `Zeus Lead Quote`, ['pickedUp']: '?', ['droppedOff']: '?', ['sign']: 'Zeus' });
    setisSendVisible(true);
  };


  const handleSendConfirmClick = (event: any, data: any) => {
    setSelectedRow({ ...data, ['status']: 'accepted', ['subject']: `Zeus! Ready #${data?.noOrder}`, ['sign']: 'Zeus' });
    setisSendConfirmVisible(true);
  };


  const handleBatchSendClick = (value:any) => {
    setSelectedRow({ ...value, ['status']: 'processing', ['buyer']: buyers[0], ['subject']: `Zeus Lead Quote`, ['pickedUp']: '?', ['droppedOff']: '?', ['sign']: 'Zeus' });
    setisMultipleSendVisible(true);
  };

  const handleOrderClick = (event: any, data: any) => {
    setSelectedRow(data);
    setisOrderVisible(true);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field == 'buyerEmail') {
      const result = buyers.filter((buyer: any) => buyer.email == value);
      const buyerName = result[0].name;
      setSelectedRow({ ...selectedRow, [field]: value, ['buyerName']: buyerName });
      return;

    }

    setSelectedRow({ ...selectedRow, [field]: value });
  }

  const handleSelectChange = (field: string, item: any) => {
    const value = item.value;
    setSelectedRow({ ...selectedRow, [field]: value });
  }

  const handleCheckboxClick = (event: any, id: string) => {

    const selectedIndex = selected.indexOf(id);
    let newSelected: any = [];

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
  }, [router, deleteRowId]);

  const onBatchDelete = useCallback(() => {
    setisConfirmVisible(false);
    setisLoading(true);
    axios.delete(`/api/cars`, { data: { ids: selected } })
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
  }, [router, selected]);

  const onBatchChangeStatus = useCallback((status: string) => {
    setisConfirmVisible(false);
    setisLoading(true);
    axios.post(`/api/cars/changestatus/`, { ids: selected, status: status })
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
  }, [router, selected, data]);


  const onSendEmail = useCallback(() => {
    if (selectedRow.buyerEmail === '') {
      return
    }

    setisSendVisible(false);
    setisLoading(true);
    axios.post(`/api/email/send/`, { data: selectedRow })
      .then((response) => {
        console.log(response.data?.statusCode);
        const statusCode = response.data?.statusCode;
        const message = response.data?.message;
        if (statusCode == 403) {
          toast.error(message, {
            duration: 5000,
            position: 'top-center',

            // Change colors of success/error/loading icon
            iconTheme: {
              primary: '#ff0000',
              secondary: '#fff',
            },
          });

          return;
        }

        axios.post(`/api/cars/changestatus/`, { ids: [selectedRow.id], status: 'processing', buyerName: selectedRow?.buyerName, buyerEmail: selectedRow?.buyerEmail }).then(() => {
          router.refresh();
        });
        toast.success('Email Sent to Buyer!!!!', {
          duration: 8000,
          position: 'top-center',

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#0BDA51',
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
  }, [router, selectedRow]);


  /* 
  * EMAIL CONFIRM
  */

  const onSendEmailConfirm = useCallback(() => {
    if (selectedRow.buyerEmail === '') {
      return
    }

    if (selectedRow.noOrder === '' || selectedRow.sellType === null) {
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
    axios.post(`/api/email/confirm/`, { data: selectedRow })
      .then((response) => {
        console.log(response.data?.statusCode);
        const statusCode = response.data?.statusCode;
        const message = response.data?.message;
        if (statusCode == 403) {
          toast.error(message, {
            duration: 5000,
            position: 'top-center',

            // Change colors of success/error/loading icon
            iconTheme: {
              primary: '#ff0000',
              secondary: '#fff',
            },
          });

          return;
        }
        axios.post(`/api/cars/changestatus/`, { ids: [selectedRow.id], status: 'accepted', buyerName: selectedRow?.buyerName, buyerEmail: selectedRow?.buyerEmail }).then(() => {
          router.refresh();
        });
        toast.success('Email Sent to Buyer!!!!', {
          duration: 8000,
          position: 'top-center',

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#0BDA51',
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
  }, [router, selectedRow]);


  const onBatchSendEmail = useCallback(() => {
    if((selectedRow.buyerEmail === '') || (selectedRow.buyerEmail === undefined)){
      return
    }
  
    setisMultipleSendVisible(false);
    setisLoading(true);
    axios.post(`/api/email/multipleSend/`, {data:selectedRow, quotes: selected})
    .then((response) => {
      console.log(response.data?.statusCode);
      const statusCode = response.data?.statusCode;
      const message = response.data?.message;
      if(statusCode == 403){
        toast.error(message, {
          duration: 5000,
          position: 'top-center',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#ff0000',
            secondary: '#fff',
          },  
        });

        return;
      }
      

      toast.success('Emails Sent to Buyer!!!!', {
        duration: 8000,
        position: 'top-center',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#0BDA51',
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
  }, [router,selectedRow]);




  const handleOrderSubmit = useCallback(() => {
    setnoOrderError(false);

    if (selectedRow.noOrder === null || selectedRow.sellType === null || selectedRow.price === null || selectedRow.price2 === null || selectedRow.address === null) {
      setnoOrderError(true);
      return;
    }

    if (selectedRow.noOrder === undefined || selectedRow.price === undefined || selectedRow.price2 === undefined || selectedRow.address === undefined) {
      setnoOrderError(true);
      return;
    }

    if (selectedRow.noOrder === "" || selectedRow.price === "" || selectedRow.price2 === "" || selectedRow.address === "") {
      setnoOrderError(true);
      return;
    }

    setisOrderVisible(false);
    setisLoading(true);
    const quoteId = selectedRow?.id;
    axios.post(`/api/cars/changeorderno/${quoteId}`, selectedRow)
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
  }, [router, selectedRow]);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Container>
        <ModalConfirm
          visible={isConfirmVisible}
          onClose={handleConfirmModalClose}
          action={onDelete} />

        <ModalDetails
          visible={isModalVisible}
          data={selectedRow}
          onClose={handleModalClose} />

        <ModalEdit
          handleInput={handleInputChange}
          visible={isEditVisible}
          data={selectedRow}
          refresh={refresh}
          setisLoading={setisLoading}
          onClose={handleEditClose} />

        <ModalOrder
          error={noOrderError}
          handleSubmit={handleOrderSubmit}
          handleInput={handleInputChange}
          handleZip={handleZipcodeChange}
          handleSelect={handleSelectChange}
          visible={isOrderVisible}
          data={selectedRow}
          onClose={handleOrderClose} />

        <ModalSend
          visible={isSendVisible}
          data={selectedRow}
          handleInput={handleInputChange}
          handleSubmit={onSendEmail}
          onClose={handleSendClose}
          buyers={buyers}
        />

        <ModalSendConfirm
          visible={isSendConfirmVisible}
          data={selectedRow}
          handleInput={handleInputChange}
          handleSubmit={onSendEmailConfirm}
          onClose={handleSendConfirmClose}
          buyers={buyers}
        />

        <ModalMultipleSend
          visible={isMultipleSendVisible}
          data={selectedRow}
          handleInput={handleInputChange}
          handleSubmit={onBatchSendEmail}
          onClose={handleMultipleSendClose}
          buyers={buyers}
        />


        <Stack className='my-5' direction="row" alignItems="center" justifyContent="space-between" >
          <div className='text-2xl md:text-4xl'>
            {header}
          </div>
        </Stack>

        <QuoteTableToolbar
          onDelete={onBatchDelete}
          onChangeStatus={onBatchChangeStatus}
          onBatchSendEmail={handleBatchSendClick}
          numSelected={selected?.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <QuoteList
          notFound={notFound}
          selected={selected}
          setSelected={setSelected}
          onBatchDelete={onBatchDelete}
          onBatchChangeStatus={onBatchChangeStatus}
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

          <QuoteTable
            page={page}
            setPage={setPage}
            notFound={notFound}
            filterName={filterName}
            selected={selected}
            setSelected={setSelected}
            onBatchDelete={onBatchDelete}
            onBatchChangeStatus={onBatchChangeStatus}
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


export default QuotesPage