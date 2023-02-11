import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from '../models/IUser';
import { UsersService } from '../Services/UserService';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import Box from '@mui/material/Box';

interface IState{
    loading:boolean,
    users:IUser[],
    errorMsg:string
}
const SecondPage: React.FC = () => {
  const [user, setUser] = useState({ ...JSON.parse(localStorage.getItem("user") as any) });
  const[state,setState]=useState<IState>({
    loading:false,
    users:[] as IUser[],
    errorMsg:"",
})
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return navigate("/");
    }
    UsersService.getAllUsers()
    .then((res)=>setState({
        ...state,loading:false,users:res.data
    }))
    .catch(err=>setState({
        ...state,loading:false,errorMsg:err.message
    }));
 
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const {loading,users,errorMsg}=state

  console.log("Users data",users);
  const map2 = users?.map(x => ({ id:x.id,col1: x.name, col2: x.username, col3: x.email }));
     const columns: GridColDef[] = [
         
         { field: "col1", headerName: "Name", width: 300, headerClassName: 'super-app-theme--header',
         headerAlign: 'center' },
         { field: "col2", headerName: "UserName", width: 300, headerClassName: 'super-app-theme--header',
         headerAlign: 'center' },
         { field: "col3", headerName: "Email", width: 300, headerClassName: 'super-app-theme--header',
         headerAlign: 'center' }
       ];
     

  return (
    <div>
      <h1>Welcome to Second Page</h1>
      <h4>Name: {user.name}</h4>
      <h4>Email: {user.email}</h4>
      <Button onClick={handleLogout}>Logout</Button>

      <>
       <h1>Data From API's</h1>
{errorMsg && (<p>{errorMsg}</p>)}
{loading && (<h1>Loading...</h1>)}


      <Box 
      sx={{
        height: 500,
        width: '70%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
      }}
    >
        <DataGrid rows={map2} columns={columns} />
           </Box>
        </>
   
    </div>
  );
};
export default SecondPage;
