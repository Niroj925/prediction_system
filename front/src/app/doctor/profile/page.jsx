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
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rbOpen, setRbOpen] = useState({});
  const [prescription,setPrescription]=useState();
  const [patientId,setPatientId]=useState("");
  const [filterPatient,setFilterPatient]=useState([]);

  const [info, setInfo] = useState({
    name: "",
    contact: "",
    email: "",
    hospital: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const router = useRouter();

  const searchParam = useSearchParams();
  const userId = searchParam.get("id");

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await api.get(`/doctor/${userId}`);
        if (response.status == 200) {
          console.log("doctorid:", response.data.id);
          setDoctorId(response.data.id);
        } else {
          setDoctorId(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    getDoctor();
  }, [userId]); 
  
  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await api.get(`/patient/${doctorId}`);
        if (response.status === 200) {
          setPatients(response.data);
        } else {
          console.log("Unable to fetch patient");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    if (doctorId) {
      getPatient();
    }
  }, [doctorId]);

  function searchByNameOrNumber(array, search) {
    const lowercaseQuery = search.toLowerCase();
    return array.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseQuery) 
        || item.contact.includes(search)
    );
  }

  useEffect(() => {
    const sortedPatients = [...patients].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  
    if (search.length > 0) {
      const filtered = searchByNameOrNumber(sortedPatients, search);
      setFilterPatient(filtered);
    } else {
      setFilterPatient(sortedPatients);
    }
  }, [patients, search]); 

  const fDate = (dateString) => {
    const normalDate = new Date(dateString);

    const formattedDate = normalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  const handleDelete = async (patientId) => {
    try {
      const response = await api.delete(`/patient/delete/${patientId}`, {
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

  const handleCreate = async () => {
    console.log(info);
    const data = {
      name: info.name,
      contact: info.contact,
      email: info.email,
      hospital: info.hospital,
      description: info.description,
    };
    try {
      const response = await api.post(`/doctor/add/${userId}`, data);
      console.log(response.data);
      if (response.status == 200) {
        setDoctorId(response.data.id);
        getPatient();
        setOpen(false);
        setInfo({
          name: "",
          contact: "",
          email: "",
          hospital: "",
          description: "",
        });
        toast.success("Successfully Registered..!! ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      } else {
        console.log("unable to add");
      }
    } catch (err) {
      toast.error("Email Not Found..!! ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };

  const sendPrescription = async() => {
    const data={
      patientId,
      userId,
      prescription
    }

    try{

      const response=await api.post('/user/patient/prescription',data);
         console.log(response.data);
      if(response.status==200){
        toast.success("Successfully sent..!! ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
      }

    }catch(err){
      console.log(err)
      toast.error("Unable to Sent.!! ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }finally{
      handleRbClose(patientId)
    }
   
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

 const handlePrescription=(e)=>{
  setPrescription(e.target.value);
 }

  const handleRbOpen = (id) => {
    setPatientId(id);
    setRbOpen((prevState) => ({
      ...prevState,
      [id]: true, // Set the open state for the clicked row to true
    }));
    console.log(rbOpen);
  };

  const handleRbClose = (id) => {
    setRbOpen((prevState) => ({
      ...prevState,
      [id]: false, // Set the open state for the clicked row to false
    }));
  };

  let sn = 1;
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={search}
            className={styles.searchInput}
            onChange={handleSearch}
          />
        </div>
        {doctorId == null && (
          <div>
            <button className={styles.createbtn} onClick={handleOpen}>
              Set profile
            </button>
          </div>
        )}
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
                    placeholder="Name"
                    name="name"
                    value={info.name}
                    className={styles.searchInput}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    placeholder="Contact"
                    name="contact"
                    value={info.contact}
                    className={styles.searchInput}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={info.email}
                    className={styles.searchInput}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Hospital"
                    name="hospital"
                    value={info.hospital}
                    className={styles.searchInput}
                    onChange={handleInputChange}
                  />
                  <textarea
                    rows={5}
                    placeholder=" Description..."
                    name="description"
                    value={info.description}
                    className={styles.searchInput}
                    onChange={handleInputChange}
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
        <h2>Patient List</h2>
      </div>
      <div className={styles.customerList}>
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell align="right">SN.</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Mobile Number</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Book Date</TableCell>
                <TableCell align="center">Stroke Chances</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients &&
                filterPatient.map((patient) => (
                  <TableRow
                    key={patient.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className={`
              ${styles.customerRow}
                `}
                  >
                    <TableCell align="right">{sn++}</TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleRbOpen(patient.id)} // Open dialog when the cell is clicked
                      className={styles.name}
                    >
                      {patient.name}
                    </TableCell>
                    {/* Your other table cells */}
                    {rbOpen[patient.id] && ( // Check if dialog should be open for this row
                      <Dialog
                        open={rbOpen[patient.id]} // Use the open state for this row
                        onClose={() => handleRbClose(patient.id)} // Close dialog when necessary
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        {/* Dialog content */}
                        <DialogTitle id="alert-dialog-title">
                          {"Send Prescription"}
                        </DialogTitle>
                        <div className={styles.prescriptionBox}>
                          
                            <textarea
                              rows={10}
                              placeholder=" Prescription..."
                              name="prescription"
                              value={prescription}
                              className={styles.prescription}
                              onChange={handlePrescription}
                            />
                         
                        </div>
                        <DialogActions>
                          <Button onClick={() => handleRbClose(patient.id)}>Cancel</Button>
                          <Button
                            onClick={() => {
                              sendPrescription();
                            }}
                            autoFocus
                          >
                            Send
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )}
                    <TableCell align="center">{patient.contact}</TableCell>
                    <TableCell align="center">{patient.email}</TableCell>
                    <TableCell align="center">
                      {fDate(patient.createdAt)}
                    </TableCell>
                    <TableCell align="center">{patient.stroke}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(patient.id)}
                      />
                    </TableCell>
            
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
   
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
