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
import Container from '@/app/components/Container';
import ModalEdit from './ModalEdit';

TimeAgo.addLocale(en)

// ----------------------------------------------------------------------

interface ListingCardProps {
  data: any;
}

const UserPage: React.FC<ListingCardProps> = ({
  data,
}) => {
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
  const [isConfirmVisible, setisConfirmVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [deleteRowId, setdeleteRowId] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
      setQuotes(data);
  }, [data])
  
  useEffect(() => {
    console.log(selected);
  }, [selected])
  

  const handleModalClose = () =>{
    setisModalVisible(false);
  }
  const handleEditClose = () =>{
    setisEditVisible(false);
  }
  const handleConfirmModalClose = () =>{
    setisConfirmVisible(false);
  }

  const handleSort = (event:any, id:any) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event:any) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      const newSelecteds = quotes.map((n:any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event:any, data:any) => {
    
    const role = event;
    console.log(role);
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
      console.log(selected);
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

  const handleEditClick = (event:any, data:any) => {
    
    setSelectedRow(data);
    setisEditVisible(true);
  };


  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event:any) => {
    console.log(event.target.value)
    setPage(0);
    setFilterName(event.target.value);
  };

  
useEffect(() => {
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
    <Container isLoading={isLoading}>
      <ModalConfirm visible={isConfirmVisible} onClose={handleConfirmModalClose} action={onDelete}/>
      <ModalDetails visible={isModalVisible} data={selectedRow} onClose={handleModalClose}/>
      <ModalEdit  visible={isEditVisible} data={selectedRow} onClose={handleEditClose}/>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quotes</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          onDelete={onBatchDelete}
          numSelected={selected?.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
               order={order}
                orderBy={orderBy}
                rowCount={quotes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'vin', label: 'VIN' },
                  { id: 'make', label: 'Make' },
                  { id: 'model', label: 'Model' },
                  { id: 'year', label: 'Year' },
                  { id: 'engine', label: 'Engine' },
                  { id: 'date', label: 'Date' },

                  { id: '' },
                ]}
              />
              <TableBody>
                {quotes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row:any) => (
                    <UserTableRow
                      key={row.id}
                      data={row}
                      selected={selected?.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      handleRowClick={(event) => handleRowClick(event, row)}
                      handleEditClick={(event) => handleEditClick(event, row)}
                      handleDeleteClick={(event) => handleDeleteClick(event, row)}
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
    
  );
}


export default UserPage