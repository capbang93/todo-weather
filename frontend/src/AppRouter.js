import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import EditInfo from "./EditInfo";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";




function Copyright(){
    return(
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ©"}
            fsoftwareengineer. {new Date().getFullYear()}
            {"."} 
            </Typography>
    );
}

class AppRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/" element={<App />}/>

                        {/* editinfo까지는 그냥 라우터 링크로 접근 -> 이후 function수행 */}
                        <Route path="/editinfo" element={<EditInfo />}/>
                    </Routes>
                </div>
                <div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;