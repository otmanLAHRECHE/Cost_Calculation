import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import { getAllServices, getAllServicesNames, addNewService, updateService, getSelectedService, deleteService } from '../../../actions/services_data'
import Alt from '../../layouts/alert';

const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'المصلحة', width: 220 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Cuisine_Services(){

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);

    const [medicName, setMedicName] = React.useState("");

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [unite, setUnite] = React.useState(0);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [typeValue, setTypeValue] = React.useState();
    const [rowData, setRowData] = React.useState("");
    
    

    const addMedicSave = async () => {


      var test = true;

      setMedicNameError([false, ""])


      if (medicName == ""){
        setMedicNameError([true,"Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        console.log("good to go....")
        setOpen(false);

        const data = {
          name:medicName,
        }

        console.log("data", JSON.stringify(data));


        const token = localStorage.getItem("auth_token");

        setResponse(await addNewService(token, JSON.stringify(data))); 
        
      }
      else{
        
        setLoadError(true)
        console.log("error")

      }

    };

    const editMedicSave = async () => {

      var test = true;

      setMedicNameError([false, ""])


      if (medicName == ""){
        setMedicNameError([true,"Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        setOpenUpdate(false);

        const data = {
          name:medicName,
        }

        const token = localStorage.getItem("auth_token");
        setResponse(await updateService(token, JSON.stringify(data), rowData.id)); 

        setOpenUpdate(false);
        
      }
      else{ 
        setLoadError(true)
        console.log("error")
      }

    };

   

    const addMedicOpen = () => {

      
      
      setOpen(true);
      setMedicName("");
      setMedicNameError([false, ""])
    };
    const addMedicClose = () => {
      setOpen(false);
    };

    const editMedicOpen= async () => {
      
      console.log(selectionError);

      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{    
        const token = localStorage.getItem("auth_token");

        setRowData(await getSelectedService(token, selectionModel[0])); 
      }

    };
  
    const editMedicClose = () => {
      setOpenUpdate(false);
    };

    const deleteMedicOpen = () => {

      console.log(selectionError);

      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{   
        setOpenDelete(true);
      }
    };

    const deleteMedicClose = () => {
      setOpenDelete(false);
    };


    const deleteConfirmation = async () =>{

      setOpenDelete(false);
      const token = localStorage.getItem("auth_token");
      setResponse(await deleteService(token, selectionModel[0])); 

    };   

    React.useEffect(() => {

      try{

        if (rowData == "no data"){
          setResponseErrorSignal(true);
        } else if(rowData != "") {
  
        setOpenUpdate(true);
        setMedicName(rowData.article_name);
        setMedicNameError([false, ""]);
        }
      }catch(e){
        console.log(e)
      }

    }, [rowData]);
   
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
          setData(await getAllServices(token));
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
                  <Grid item xs={9}>
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
                  <Grid item xs={3}>
                     <List
                          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            إدارة المصالح 
                            </ListSubheader>
                          }
                        >
                          <ListItemButton onClick={addMedicOpen}>
                            <ListItemIcon>
                              <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="إضافة" />
                          </ListItemButton>
                          <ListItemButton onClick={editMedicOpen}>
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="تعديل" />
                          </ListItemButton>
                          <ListItemButton onClick={deleteMedicOpen}>
                            <ListItemIcon>
                              <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText primary="حذف" />
                          </ListItemButton>
                        </List>

                  </Grid>
                </Grid>  


                  <Dialog open={open} onClose={addMedicClose}  maxWidth="md" fullWidth={true}>
                      <DialogTitle>إضافة</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={medicNameError[0]}
                              helperText={medicNameError[1]}
                              required
                              margin="dense"
                              name="medic_name"
                              id="medic_name"
                              label="تسمية المصلحة "
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setMedicName(event.target.value)}}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={addMedicClose}>رجوع</Button>
                            <Button onClick={addMedicSave}>حفظ</Button>
                          </DialogActions>
                  </Dialog>


                  <Dialog open={openUpdate} onClose={editMedicClose}  maxWidth="md" fullWidth={true}>
                    <DialogTitle>تغيير</DialogTitle>
                        <DialogContent>
                          <TextField
                            error={medicNameError[0]}
                            helperText={medicNameError[1]}
                            required
                            margin="dense"
                            name="medic_name"
                            id="medic_name"
                            label="تسمية المصلحة "
                            fullWidth
                            variant="standard"
                            value={medicName}
                            onChange={(event) => {setMedicName(event.target.value)}}
                          />
                              
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={editMedicClose}>رجوع</Button>
                          <Button onClick={editMedicSave}>حفظ</Button>
                        </DialogActions>
                  </Dialog>


                  <Dialog open={openDelete}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={deleteMedicClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la suppression d'un article"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  هل انت متأكد من حذف هذه المصلحة ستفقد جميع المعلومات الخاصة بها بما في ذلك الإستهلاك
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={deleteMedicClose}>رجوع</Button>
                                  <Button onClick={deleteConfirmation}>حذف</Button>
                                </DialogActions>
                  </Dialog>
                         
        </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {selectionError ? <Alt type='error' message='Selectioner un médicament' onClose={()=> setSelectionError(false)} /> : null}
      
        </React.Fragment>




    )
}