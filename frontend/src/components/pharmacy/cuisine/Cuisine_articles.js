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

import { getAllArticles, getAllArticleNames, addNewArticle, updateArticle, getSelectedArticle, deleteArticle } from '../../../actions/articles_data'
import Alt from '../../layouts/alert';

const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'article_code', headerName: 'الرمز', width: 100 },
    { field: 'article_name', headerName: 'المواد الغذائية', width: 300 },
    { field: 'article_type', headerName: 'الحصة', width: 300 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Cuisine_Articles(){

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [medicCodeError, setMedicCodeError] = React.useState([false, ""]);
    const [medicTypeError, setMedicTypeError] = React.useState([false, ""]);

    const [medicName, setMedicName] = React.useState("");
    const [medicCode, setMedicCode] = React.useState("");
    const [medicType, setMedicType] = React.useState("");

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
      setMedicCodeError([false, ""])
      setMedicTypeError([false, ""])


      if (medicName == ""){
        setMedicNameError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (medicCode == ""){
        setMedicCodeError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (medicType == ""){
        setMedicTypeError([true, "Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        console.log("good to go....")
        setOpen(false);

        const data = {
          article_name:medicName,
          article_code:medicCode,
          article_type:medicType,
        }

        console.log("data", JSON.stringify(data));


        const token = localStorage.getItem("auth_token");

        setResponse(await addNewArticle(token, JSON.stringify(data))); 
        
      }
      else{
        
        setLoadError(true)
        console.log("error")

      }

    };

    const editMedicSave = async () => {

      var test = true;

      setMedicNameError([false, ""])
      setMedicCodeError([false, ""])
      setMedicTypeError([false, ""])


      if (medicName == ""){
        setMedicNameError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (medicCode == ""){
        setMedicCodeError([true,"Ce champ est obligatoire"])
        test = false;
      }
      if (medicType == ""){
        setMedicTypeError([true, "Ce champ est obligatoire"])
        test = false;
      }

      if (test){
        console.log("good to go....")
        setOpenUpdate(false);

        const data = {
          article_name:medicName,
          article_code:medicCode,
          article_type:medicType,
        }

        const token = localStorage.getItem("auth_token");
        setResponse(await updateArticle(token, JSON.stringify(data), rowData.id)); 

        setOpenUpdate(false);
        
      }
      else{ 
        setLoadError(true)
        console.log("error")
      }

    };

    const change_type = (event) => {

        if (event.target.value == ""){
          setMedicType("")
        }else if (event.target.value == 1){
          setMedicType("اللحوم البيضاء و الحمراء")
        }else if (event.target.value == 2){
          setMedicType("الخضر الفواكه")
        }else if (event.target.value == 3){
          setMedicType("التغذية العامة")
        }else if (event.target.value == 4){
          setMedicType("الخبز و الحلويات")
        }else if (event.target.value == 5){
          setMedicType("الحليب و مشتقاته")
           }

    };

    const addMedicOpen = () => {

      
      
      setOpen(true);
      setUnite(0)
      setMedicName("");
      setMedicCode("")
      setMedicType("")
      setMedicNameError([false, ""])
      setMedicCodeError([false, ""])
      setMedicTypeError([false, ""])
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

        setRowData(await getSelectedArticle(token, selectionModel[0])); 
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
      setResponse(await deleteArticle(token, selectionModel[0])); 

    };   

    React.useEffect(() => {

      try{

        if (rowData == "no data"){
          setResponseErrorSignal(true);
        } else if(rowData != "") {
  
        setOpenUpdate(true);
        console.log(rowData.id);
  
        setMedicName(rowData.article_name);
        setMedicCode(rowData.article_code);

        setMedicType(rowData.article_type);
        
        
        if(rowData.article_type == "اللحوم البيضاء و الحمراء"){
          setTypeValue(1);
        }else if(rowData.article_type == "الخضر الفواكه"){
          setTypeValue(2);
        }else if(rowData.article_type == "التغذية العامة"){
          setTypeValue(3);
        }else if(rowData.article_type == "الخبز و الحلويات"){
          setTypeValue(4);
        }else if(rowData.article_type == "الحليب و مشتقاته"){
          setTypeValue(5);
        }
        
        
        setMedicNameError([false, ""])
        setMedicCodeError([false, ""])
        setMedicTypeError([false, ""])
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
          setData(await getAllArticles(token));
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
                            إدارة المواد الغذائية
                            </ListSubheader>
                          }
                        >
                          <ListItemButton onClick={addMedicOpen}>
                            <ListItemIcon>
                              <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="إضافة مواد غذائية" />
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
                      <DialogTitle>إضافة مادة غذائية</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={medicNameError[0]}
                              helperText={medicNameError[1]}
                              required
                              margin="dense"
                              name="medic_name"
                              id="medic_name"
                              label="تسمية المادة الغذائية"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setMedicName(event.target.value)}}
                            />
                            <TextField
                              error={medicCodeError[0]}
                              helperText={medicCodeError[1]}
                              required
                              margin="dense"
                              id="medic_code"
                              label="الرمز"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setMedicCode(event.target.value)}}
                            />
                            
                              <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                  <InputLabel required htmlFor="grouped-select"
                                  error={medicTypeError[0]}
                                  helperText={medicTypeError[1]}>الحصة الغذائية</InputLabel>
                                    <Select defaultValue="" id="grouped-select" label="Type de Article"
                                    onChange={change_type}>
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <ListSubheader>المواد الغذائية</ListSubheader>
                                      <MenuItem value={1}>اللحوم البيضاء و الحمراء</MenuItem>
                                      <MenuItem value={2}>الخضر الفواكه</MenuItem>
                                      <MenuItem value={3}>التغذية العامة</MenuItem>
                                      <MenuItem value={4}>الخبز و الحلويات</MenuItem>
                                      <MenuItem value={5}>الحليب و مشتقاته</MenuItem>
                                      

                                    </Select>
                                </FormControl>

                            
                            

                          </DialogContent>
                          <DialogActions>
                            <Button onClick={addMedicClose}>رجوع</Button>
                            <Button onClick={addMedicSave}>حفظ</Button>
                          </DialogActions>
                  </Dialog>


                  <Dialog open={openUpdate} onClose={editMedicClose}  maxWidth="md" fullWidth={true}>
                    <DialogTitle>تغيير المادة الغذائية</DialogTitle>
                        <DialogContent>
                          <TextField
                            error={medicNameError[0]}
                            helperText={medicNameError[1]}
                            required
                            margin="dense"
                            name="medic_name"
                            id="medic_name"
                            label="تسمية المادة الغذائية"
                            fullWidth
                            variant="standard"
                            value={medicName}
                            onChange={(event) => {setMedicName(event.target.value)}}
                          />
                          <TextField
                            error={medicCodeError[0]}
                            helperText={medicCodeError[1]}
                            required
                            margin="dense"
                            id="medic_code"
                            label="الرمز"
                            fullWidth
                            variant="standard"
                            value={medicCode}
                            onChange={(event) => {setMedicCode(event.target.value)}}
                          />
                          
                          
                            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                <InputLabel required htmlFor="grouped-select"
                                error={medicTypeError[0]}
                                helperText={medicTypeError[1]}>الحصة الغذائية</InputLabel>
                                  <Select defaultValue="" id="grouped-select" label="Type de médicament"
                                  onChange={change_type}
                                  value ={typeValue}>
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    <ListSubheader>المواد الغذائية</ListSubheader>
                                      <MenuItem value={1}>اللحوم البيضاء و الحمراء</MenuItem>
                                      <MenuItem value={2}>الخضر الفواكه</MenuItem>
                                      <MenuItem value={3}>التغذية العامة</MenuItem>
                                      <MenuItem value={4}>الخبز و الحلويات</MenuItem>
                                      <MenuItem value={5}>الحليب و مشتقاته</MenuItem>
                                    
                                  </Select>
                              </FormControl>

                              
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
                                  هل انت متأكد من حذف هذه الحصة ستفقد جميع المعلومات الخاصة بها بما في ذلك الإستهلاك
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