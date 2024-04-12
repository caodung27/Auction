import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {CountryDropdown} from 'react-country-region-selector';
import ConvertDMS from '../Maps/ConvertDMS';

// For the material modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateCoordinates from '../Maps/CreateCoordinates';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

function Registration() {

    let navigate = useNavigate();
    const [coordinates, setCoordinates] = useState({});
    const [holdData, setHoldData] = useState({});
    const [mycountry, setCountry] = useState([]);

    const initialValues = {
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        telephone: "",
        location: "",
        taxnumber: "",
        country: "Vietnam",
    };

    // REGEX for the telephone validation
    const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    // validation of the fields
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required("You must input a username").test('Unique Username', 'Username already exists',
            function (value) {
                return new Promise((resolve, reject) => {
                    axios.get(`https://localhost:33123/auth/exists/${value}`)
                        .then((res) => {
                            console.log(res);
                            if(res.data.exists===true){
                                resolve(false)
                            }
                            else {
                                resolve(true);
                            }
                        })
                        .catch((error) => {
                            resolve(true);
                        })
                })
            }
        ),
        password: Yup.string().min(4).max(20).required("You must input a password"),
        confirmPassword: Yup.string().min(4).max(20).required("You must input this.").oneOf([Yup.ref('password'), null], 'Passwords must match'),
        name: Yup.string().min(3).max(30).required("You must input a name"),
        surname: Yup.string().min(3).max(30).required("You must input a surname"),
        email: Yup.string().required("You must input an email").email(),
        telephone: Yup.string().matches(phoneRegex, 'Phone number is not valid').required("You must input a telephone"),
        latitude: Yup.number("This is a number").moreThan(-90).lessThan(90),
        longitude: Yup.number("This is a number").moreThan(-180).lessThan(180),
        location: Yup.string().min(3).max(155).required("You must input a location."),
        taxnumber: Yup.number().required("You must input your tax number.").positive().integer().lessThan(1000000000, "This is not valid").moreThan(99999999, "This is not valid"),
        country: Yup.string().required("You must input your country."),
    });

    const onSubmit = (data) =>{
        setHoldData(data);
        setOpenDialog(true);
    };

    const handleChange  = (country) =>{
        setCountry(country);
        console.log(country);
        initialValues.country=country;
    };


    // These here are for the Modal that displays awaiting approval
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        navigate('/auctions');
    }
    
    // these for the coordinates
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        holdData.country = mycountry;
            
        // if the user inputed coordinates add them too
        if (Object.keys(coordinates).length > 0 ){
            var point = { type: 'Point', coordinates: [coordinates.lat, coordinates.lng]};
            holdData.latitudeLongitude = point;
        }

        axios.post("https://localhost:33123/auth/", holdData).then((res)=>{
        });

        setOpen(true);
        
    };

    return (

    <div className='createItemPage'>
        <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        onChange={handleChange}
        validationSchema={validationSchema} 
        validateOnChange={false}
        >
            <Form className='formContainer gradient-custom' >
                <label>Username: </label>
                <Field 
                id="inputCreateItem" 
                name="username" 
                placeholder="Username" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="username" component="span" />

                <label>Password: </label>
                <Field 
                id="inputCreateItem" 
                name="password" 
                type="password"
                placeholder="*****" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="password" component="span" />

                <label>Confirm Password: </label>
                <Field 
                id="inputCreateItem" 
                name="confirmPassword" 
                type="password"
                placeholder="*****" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="confirmPassword" component="span" />

                <label>Name: </label>
                <Field 
                id="inputCreateItem" 
                name="name" 
                placeholder="Name" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="name" component="span" />

                <label>Surname: </label>
                <Field 
                id="inputCreateItem" 
                name="surname" 
                placeholder="Surname" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="surname" component="span" />

                <label>Email: </label>
                <Field 
                id="inputCreateItem" 
                name="email" 
                placeholder="Email" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="email" component="span" />

                <label>Telephone: </label>
                <Field 
                id="inputCreateItem" 
                name="telephone" 
                placeholder="Telephone" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="telephone" component="span" />
                
                <label>Tax: </label>
                <Field 
                id="inputCreateItem" 
                name="taxnumber" 
                placeholder="Taxnumber" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="taxnumber" component="span" />

                <label>Location: </label>
                <Field 
                id="inputCreateItem" 
                name="location" 
                placeholder="City" 
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="location" component="span" />
                
                <label>Country: </label>
                
                <CountryDropdown 
                id="inputCreateItem" 
                name="country"
                value={mycountry}
                onChange={(e) => handleChange(e)}
                />
                <ErrorMessage style={{color: 'red', paddingBottom: '10px'}} name="country" component="span" />
                
                <button type="submit">
                    Confirm
                </button>
                
            </Form>
        </Formik>

        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{
                fontFamily: 'Futura',
                
            }}>
            {"Optionally, you can also provide your precise location"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <CreateCoordinates setCoordinates={setCoordinates} />
                { (Object.keys(coordinates).length > 0 ) &&
                    <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
                    Set to:&nbsp;&nbsp;{ConvertDMS(coordinates.lat, coordinates.lng)}
                  </Typography>
                }
            </DialogContentText>
            </DialogContent>
            <DialogActions>

            <button className="buttonito"  onClick={handleCloseDialog} autoFocus>Continue</button>
      
           </DialogActions>
        </Dialog>


        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Application Received
                </Typography>
                <img alt="Received" className='approval_photo' src='https://codenex.in/wp-content/uploads/2019/01/appdevelopment.png' />
                <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
                    You'll be able to use our services as soon as you have been approved!
                </Typography>
            </Box>
        </Modal>

    </div>

  )
}

export default Registration;
