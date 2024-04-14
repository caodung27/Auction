import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Registration from '../components/Login/Registration';
import LoginForm from '../components/Login/LoginForm';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {motion} from 'framer-motion'

function Login() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        
        <motion.div className='loginME'  
            initial={{width: 0}}
            animate={{width: '80vw'}}
            exit={{ width: '80vw', transition: {duration: 0.1 }}}
        > 

            <Grid container  direction={"row"} spacing={1.35}>
                <Grid item>
                    <Typography sx={{ fontSize: 20, fontFamily: 'Futura', textAlign: 'center', color: '#ee4d2d' }} gutterBottom>Already have an Account?</Typography>
                    <LoginForm />
                    <br />
                    <br />
                    <div style={{ marginLeft: 220 }}>
                    <ShoppingBagIcon sx={{ fontSize: 100 , color: '#ee4d2d' }}  /> 
                    </div>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h7" component="h2">Lorem Ipsum</Typography>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h6" component="h2">• Lorem Ipsum is simply dummy text of the printing </Typography>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h6" component="h2">• Lorem Ipsum is simply dummy text of the printing </Typography>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h6" component="h2">• Lorem Ipsum is simply dummy text of the printing </Typography>
                    <br />
                    <br />
                    <div style={{ marginLeft: 220 }}>
                    <AssignmentIndIcon sx={{ fontSize: 100, color: '#ee4d2d' }} /> 
                    </div>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h7" component="h2">Lorem Ipsum</Typography>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h6" component="h2">• Lorem Ipsum is simply dummy text of the printing</Typography>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h6" component="h2">• Lorem Ipsum is simply dummy text of the printing</Typography>
                    <Typography sx={{fontFamily: 'Futura', width: '100%'}} variant="h6" component="h2">• Lorem Ipsum is simply dummy text of the printing</Typography>
                    <br />       
                   
                </Grid>
                <Grid item>
                    <Typography sx={{ fontSize: 20, fontFamily: 'Futura', textAlign: 'center', color: '#ee4d2d' }} gutterBottom>Register for an Account!</Typography>
                    <Registration />
                </Grid>
            </Grid>
        
        </motion.div>
  )
}

export default Login;
