import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Moment from 'react-moment';
import moment from 'moment';

import 'moment-timezone';

const ColorCells = (row: any, color: string, lastCell: number) => {
  

    for(let i = 1; i<=lastCell;i++){
      let cel = row.getCell(i);
      if(i == 6){
        cel.numFmt='$ 0.00';
      }
       cel.fill = {
         type: 'pattern',
         pattern:'solid',
         fgColor:{argb:color},
         //bgColor:{argb:'Ff77bc65'}
       };
    }

  }


export const GenerateExcel = async (title?: string, worksheetname?: string, data?:any[],selectedBuyer?:any, weekLeads?:any, bussinesInfo?:any) => {
    let currentDate = new Date();
    const formatedCurrentDate = moment(currentDate).format("MM/DD/YYYY");
    let startDate = moment(weekLeads.startDate).format("MMM D");
    let endDate = moment(weekLeads.endDate).format("MMM D, YYYY");;
    console.log(weekLeads.endDate);


    // const formatedStartDate = month+" "+startDate.getDay();

    // const formatedEndDate = month+" "+endDate.getDay()+","+endDate.getFullYear();
    const wb = new ExcelJS.Workbook();

    const ws = wb.addWorksheet();

    let row = ws.addRow(['From', 'Bill To', 'Invoice']);
    
    row.font = {
      name: 'Calibri',
      size: 11,
      bold: false
     };

     ColorCells(row, '70AD47',3);
    
     
    

    
    row = ws.addRow([bussinesInfo?.name, selectedBuyer?.name, 'Invoice: #']);
    ColorCells(row, 'FFe2efd9',3);

     
    row = ws.addRow([bussinesInfo?.address, selectedBuyer?.address, `Date: ${formatedCurrentDate}`]);
    ColorCells(row, 'B4C6E7',3);

    row =  ws.addRow([bussinesInfo?.location, `Phone: ${selectedBuyer?.phone}`, `Week Leads: ${startDate} to ${endDate}`]);
    ColorCells(row, 'FFe2efd9',3);

    row =  ws.addRow([`Phone: ${bussinesInfo?.phone}\r\nEmail: ${bussinesInfo?.email}`]);
    row.height = 40;
    row.alignment= { wrapText:true }
    ColorCells(row, 'B4C6E7',3);

    ws.addRow(['']);
    ws.addRow(['']);

    row = ws.addRow(['Ref#',	'Vehicle',	'Vin Number',	'Address',	'Phone',	'Commission']);
     ColorCells(row, '70AD47',6);

     let col = ws.getColumn('A');
     col.width = 45;
     col = ws.getColumn('B');
     col.width = 35;
     col = ws.getColumn('C');
     col.width = 35;
     col = ws.getColumn('D');
     col.width = 45;
     col = ws.getColumn('E');
     col.width = 25;
     col = ws.getColumn('F');
     col.width = 25;
    try {
        let total = 0;
       
      // Check if the action result contains data and if it's an array
      if (data && Array.isArray(data)) {
        data.map((pro: any, index:number) => {
            console.log(pro);
          row = ws.addRow([pro.noOrder, pro.year+" "+pro.make+" "+pro.model, pro.vin, pro.address,pro.phone,Number(pro.price2)])
            total+= Number(pro.price2);
            //Cell
          
            

          if(index % 2 == 0){
            ColorCells(row, 'FFe2efd9',6);
          }       
          else{
            ColorCells(row, 'B4C6E7',6);
          }
        }
          ,);

          ws.addRow(['']);
          row = ws.addRow(['','','','','TOTAL',total]);
         let cell = row.getCell(6);
          cell.numFmt='$ 0.00';

        

        
      
          const buf = await wb.xlsx.writeBuffer()
      
          saveAs(new Blob([buf]), `${title}-${formatedCurrentDate}.xlsx`)
          
      } else {
        console.log("#==================Export Error")
      }
    } catch (error: any) {
      console.log("#==================Export Error", error);

    }
  };