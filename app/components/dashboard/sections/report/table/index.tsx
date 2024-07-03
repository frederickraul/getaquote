'use client'
import { Card, Table, TableBody, TableContainer, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Scrollbar from '../../../components/scrollbar'
import UserTableHead from './report-table-head'
import UserTableRow from './report-table-row'
import TableEmptyRows from './table-empty-rows'
import { applyFilter, emptyRows, getComparator } from '../../quotes/utils'
import TableNoData from './table-no-data'
import { users } from '../../../_mock/user';


interface QuoteTableProps {
  selected:any;
  setSelected:(value:any)=>void;
  filterName:string;
  page:number;
  setPage:(value:any)=>void;
  notFound:boolean;
  fieldOrder?:boolean;
  headerStyles?:any;
  data: any;
  handleCheckboxClick:(event:any,value2:any)=>void;
  handleRowClick:(event:any,value2:any)=>void;
  handleEditClick:(event:any,value2:any)=>void;
  handleDeleteClick:(event:any,value2:any)=>void;
  handleOrderClick:(event:any,value2:any)=>void;
  handleSendClick:(event:any,value2:any)=>void;
  handleSendConfirmClick:(event:any,value2:any)=>void;
  onBatchDelete:()=>void;
  onBatchChangeStatus?:(status:string)=>void;
}

const ReportTable: React.FC<QuoteTableProps> = ({
  page,
  setPage,
  filterName,
  notFound,
  selected,
  setSelected,
  handleCheckboxClick,
  handleRowClick,
  handleEditClick,
  handleDeleteClick,
  handleOrderClick,
  handleSendClick,
  handleSendConfirmClick,
  headerStyles,
  data,
}) => {

  let tableHeader = [
    { id: 'email', label: 'Email' },
    { id: 'ref', label: 'Ref#' },
    { id: 'vehicle', label: 'Vehicle' },
    { id: 'vin', label: 'Vin Number' },
    { id: 'address', label: 'Address' },
    { id: 'phone', label: 'Phone' },
    { id: 'commision', label: 'Commision' },
    { id: 'updatedAt', label: 'Date' },
   
  ];


  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');


  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleSort = (event:any, id:any) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };




  const handleSelectAllClick = (event:any) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n:any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 100));
  };





  return (
    <>
    <Scrollbar>
      <TableContainer className='relative' sx={{ overflow: 'unset' }}>
        <Table className='responsiveTable' sx={{ minWidth: 800 }}>
          <UserTableHead
            styles={headerStyles}
            order={order}
            orderBy={orderBy}
            rowCount={data.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
            headLabel={tableHeader}
            />
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row:any) => (
                <UserTableRow
                fieldOrder
                key={row.id}
                data={row}
                selected={selected?.indexOf(row.id) !== -1}
                handleClick={(event) => handleCheckboxClick(event, row.id)}
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
    {/* <TablePagination
      page={page}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[5, 10, 25,50,100]}
      onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <div className='h-10'>

      </div>
  </>
  )
}

export default ReportTable