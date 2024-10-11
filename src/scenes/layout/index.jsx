import React, {useState} from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
import { useGetUserQuery } from "state/api"
const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width: 800px)")
    const [isSideBarOpen,setIsSideBarOpen] = useState(true)
    const userId = useSelector((state) => state.global.user)
    // const {data, // the response from the api
    //     isError, // has an error
    //     isLoading, // first mount loading
    //     isFetching, // is Fetching again after the first mount
    //     isSuccess, // is 200
    //     error // Error message
    //      } = useGetUserQuery(userId)
    // console.log('data',data)
    return <Box display={isNonMobile ? "flex" :"block"} width="100%" height="100%">
        
        <Sidebar
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={() => setIsSideBarOpen}
        />
        <Box flexGrow={1}>
            <Navbar
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <Outlet/>
        </Box>
    </Box>
}

export default Layout