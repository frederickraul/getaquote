
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const ListNoData = () =>(
    <div className='
            md:hidden
            mx-2
            py-1 
          '          >
          <div className='
            border-2
            rounded-lg
            shadow
            bg-white
        '>
       
          <Typography paragraph className='text-lg md:text-2xl py-5 text-center'>
            There´s not quotes on this section
          </Typography>

         
      </div>
    </div>
  );


// TableNoData.propTypes = {
//   query: PropTypes.string,
// };


export default ListNoData;