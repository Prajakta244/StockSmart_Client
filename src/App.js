import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom'
import Dashboard from 'scenes/dashboard';
import Products from 'scenes/products';
import Layout from 'scenes/layout';
import ProfilePage from 'scenes/profilePage';
import Navbar from 'scenes/navbar';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { themeSettings } from 'theme';
import { createTheme } from '@mui/material/styles';

function App() {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Navigate to='/dashboard' replace/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/profile/:userId' element={<ProfilePage/>}/>
        </Route>
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
