import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Paper from '@mui/material/Paper';


import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Alt from '../layouts/alert';
import { getCostByService } from '../../actions/cost_data';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'service', headerName: 'Service', width: 250 },
    { field: 'value', headerName: 'Valeur', width: 250 },
    
    
  ];


  export default function CostCalculation(){

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    const [dateFilterError, setDateFilterError] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState(dayjs());
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    



    const handleChangeFilterDate = (newValue) =>{
      setDateFilter(newValue);


  }

  React.useEffect(() => {
  
    
          if (response == "error"){
            setResponseErrorSignal(true);
          } else if(response != "") {
            setResponseSuccesSignal(true);
          }
    
        }, [response]);


  React.useEffect(() => {
  
          setLoading(true);
          setDateFilterError([false, ""]);
  
          const fetchData = async () => {
            try {
              const token = localStorage.getItem("auth_token");
              var month = dateFilter.get("month")+1
              var year = dateFilter.get('year')
              setData(await getCostByService(token, month, year));
              setLoading(false);
            } catch (error) {
              console.log("error", error);
            }
          };
      
          
  
          if (dateFilter.isValid() == false || dateFilter ==""){
            setDateFilterError([true, "une erreur sur le champ de date"]);
            setDateFilterNotErr(true);
          }else{
            fetchData();
          }
    
    
        }, [response, dateFilter]);




    return(
        <React.Fragment>
    
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    
                    <Grid container spacing={1.5}>
                      <Grid item xs={7}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                        <div style={{ height: 700, width: '100%' }}>
                                                <DataGrid
                                                  components={{
                                                    Toolbar: GridToolbar,
                                                  }}
                                                    rows={data}
                                                    columns={columns}
                                                    pageSize={15}
                                                    checkboxSelection = {false}
                                                    loading={loading}
                                                    disableMultipleSelection={true}
                                                    
                                                    
                                                    
                                                />
                                          </div>   
                        
                        </Paper>
                      </Grid>
                              <Grid item xs={5}>

                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                      <DesktopDatePicker
                                                                              views={['year', 'month']}
                                                                              label="Selectioner le mois"
                                                                              value={dateFilter}
                                                                              onChange={handleChangeFilterDate}
                                                                              renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                                              helperText={dateFilterError[1]} 
                                                                              required/>}
                                                                      />

                                    </LocalizationProvider>

                                </Paper>
                                              
                              </Grid>
                    </Grid>  
    
    
                      
    
                             
            </Container>
    
    
            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
          
            </React.Fragment>
    )
  }