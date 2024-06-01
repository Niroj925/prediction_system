"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "@/component/api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button"
import {useDispatch,useSelector } from "react-redux";
import { setAccessToken } from "@/app/redux/slicers/credentialSlice";

function Profile() {
  const [doctor, setDoctor] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [doctorByUser, setDoctorByUser] = useState({});
    const token = localStorage.getItem("accessToken");
    const accessToken= useSelector((state) => state.token.accessToken);
  const router = useRouter();

  const searchParam = useSearchParams();
  const dispatch=useDispatch();

  const getPatient = async () => {
    // console.log("doctorid;", doctorId);
    try {
      const response = await api.get(`/doctor/all`, {
        headers: {
          token
        },
       withCredentials:true
      });
      console.log(response.data);
      if (response.status === 200) {
        setDoctor(response.data);
      } 
    } catch (err) {
       if(err.response.status===401){
        const response=await api.get('/auth/token/refresh',{withCredentials:true});
        localStorage.setItem('accessToken',response.data.token.accessToken);
        dispatch(setAccessToken(response.data.token.accessToken));
       }else{
        console.log(err.response);
       }
    }
  };

  useEffect(() => {
    getPatient();
  }, [accessToken]);

  const doctors = [...doctor].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  const fDate = (dateString) => {
    const normalDate = new Date(dateString);

    const formattedDate = normalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeEmail=(e)=>{
    setEmail(e.target.value);
  }

  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleOpen = () => {
    console.log('open')
    setOpen(true);
  };

  const handleClose=()=>{
    setOpen(false)
  }

  const handleDelete = async (patientId) => {
    try {
      const response = await api.delete(`/user/delete/${patientId}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      // console.log(response);

      if (response.status === 200) {
        getPatient();
      }
    } catch (err) {
      console.log("unable to delete");
    }
  };

  const handleCreate=async()=>{
   try{
    const data={
      email,
      password
    }

    const response=await api.post('/auth/create',data,{
      headers:{
        token
      }
    });
   console.log(response);
   }catch(err){
    console.log(err)
   }finally{
    getPatient();
    setOpen(false);
   }
  }

  let sn = 1;
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            className={styles.searchInput}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className={styles.createbtn} onClick={handleOpen}>
            Create Account
          </button>
        </div>

        {open && (
          <>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Create Client Account"}
              </DialogTitle>
              <div className={styles.inputBox}>
              <div className={styles.inputfield}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  className={styles.searchInput}
                  onChange={handleChangeEmail}
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={password}
                  className={styles.searchInput}
                  onChange={handleChangePassword}
                />
              </div>
              </div>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleCreate();
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
      <hr className={styles.line} />
      <div className={styles.heading}>
        <h2>Doctors List</h2>
      </div>
      <div className={styles.customerList}>
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell align="right">SN.</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctor &&
                doctors.map((doctor) => (
                  <TableRow
                    key={doctor.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className={`
              ${styles.customerRow}
                `}
                  >
                    <TableCell align="right">{sn++}</TableCell>
                    <TableCell align="center">{doctor.email}</TableCell>
                    <TableCell align="center">{doctor.doctor?doctor.doctor.name:'-'}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(doctor.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Profile;
