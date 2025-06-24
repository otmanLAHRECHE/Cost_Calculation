import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Paper from '@mui/material/Paper';

import Slide from '@mui/material/Slide';


import { getAllUsers } from '../../../actions/users_data';



import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Alt from '../../layouts/alert';



const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'first_name', headerName: 'First name', width: 150 },
    { field: 'last_name', headerName: 'Last name', width: 150 },
    { field: 'type_user', headerName: 'User type', width: 150 },
    { field: 'last_login', headerName: 'Last login', width: 180 },
    { field: 'date_joined', headerName: 'Date joined', width: 180 },
    { field: 'is_active', headerName: 'is active', width: 150 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });




  export default function ListUsers(){


    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);




    React.useEffect(() => {

        console.log(response);
  
        if (response == "error"){
          setResponseErrorSignal(true);
        } else if(response != "") {
          setResponseSuccesSignal(true);
        }
  
      }, [response]);


  
      React.useEffect(() => {
  
        setLoading(true);
  
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setData(await getAllUsers(token));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
  
      }, [response]);





    return(

        <React.Fragment>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>

                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
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
                              onSelectionModelChange={(newSelectionModel) => {
                                setSelectionModel(newSelectionModel);
                              }}
                              selectionModel={selectionModel}
                              
                          />
                    </div>   
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