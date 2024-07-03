
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function ListNoData ({ query }) {
  return(
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
       No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Try a diferent email or using diferent date ranges.
          </Typography>

         
      </div>
    </div>
  )
};


// TableNoData.propTypes = {
//   query: PropTypes.string,
// };


