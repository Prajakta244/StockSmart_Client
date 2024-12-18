import React,{useEffect,useState} from 'react'
import { SettingsOutlined,ChevronLeft,ChevronRightOutlined,HomeOutlined,ShoppingCartOutlined,Groups2Outlined,ReceiptLongOutlined,PublicOutlined,PointOfSaleOutlined,TodayOutlined,CalendarMonthOutlined,AdminPanelSettingsOutlined,TrendingUpOutlined,PieChartOutline,AccountBalanceOutlined} from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useLocation,useNavigate } from 'react-router-dom'

import { Box,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Typography, useTheme } from '@mui/material'
const Sidebar = ({isNonMobile,drawerWidth,isSideBarOpen,setIsSideBarOpen}) => {
    const {pathname} = useLocation()
    const [active,setActive] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()
    useEffect(()=>{
        setActive(pathname.substring(1))
    },[pathname])
    const navItems = [
        {
            text:"Dashboard",
            icon:<HomeOutlined/>
        },
        {
            text:"Client Facing",
            icon:null
        },
        {
            text:"Products",
            icon:<ShoppingCartOutlined/>
        },
        {
            text:"Transactions",
            icon:<ReceiptLongOutlined/>
        },
        {
            text:"Expenses",
            icon:<AccountBalanceOutlined/>
        },
        {
            text:"Sales",
            icon:null
        },
        {
            text:"Daily",
            icon:<TodayOutlined/>
        },
        {
            text:"Monthly",
            icon:<CalendarMonthOutlined/>
        },
        {
            text:"Breakdown",
            icon:<PieChartOutline/>
        },
        {
            text:"Management",
            icon:null
        },
        {
            text:"Admin",
            icon:<AdminPanelSettingsOutlined/>
        },
        {
            text:"Performance",
            icon:<TrendingUpOutlined/>
        }
    ]
  return <Box component="nav">
    <Drawer
        open={isSideBarOpen}
        onClose={setIsSideBarOpen(false)}
        variant='persistent'
        anchor='left'
        sx={{
            width:drawerWidth,
            "& .MuiDrawer-paper":{
                color:theme.palette.secondary[200],
                backgroundColor:theme.palette.background.alt,
                boxSizing:"border-box",
                borderWidth:isNonMobile?0:'2px',
                width:drawerWidth
            },
            overflow:"auto",
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
                width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
                background: "#f1f1f1",
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#555'
            }
        }}>
            <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h4" fontWeight="bold"> StockSmart </Typography>
                        </Box>
                        {!isNonMobile && (
                            <IconButton onClick={() => setIsSideBarOpen()(!isSideBarOpen)}>
                                <ChevronLeft/>
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <List>
                    {navItems.map(({text,icon}) => {
                        if(!icon){
                            return (
                                <Typography key={text} sx={{m:"2.25rem 0 1rem 3rem"}}>
                                    {text}
                                </Typography>
                            )
                        }
                        const lcText = text.toLowerCase()
                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={()=>{
                                    navigate(`/${lcText}`);
                                    setActive(lcText)
                                    }}
                                    sx={{
                                        backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                        color:active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100]
                                    }}    
                                >
                                <ListItemIcon sx={{
                                    ml:"2rem",
                                    color:active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text}>
                                    {active === lcText && (
                                        <ChevronRightOutlined sx={{ ml:'auto'}}/>
                                    )}
                                </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Drawer>

  </Box>
}

export default Sidebar