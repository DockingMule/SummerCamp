import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import '../app/globals.css';

export default function ButtonAppBar() {
  return (
    <div style={{ width: "100%"}}>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ backgroundColor: "var(--admin-blue)"}}>
          <Toolbar>
            <img src="/franchiseLogo.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
            <div style={{ flexGrow: 1 }}>
              <Button color="inherit"><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></Button>
              <Button color="inherit"><Link href="/admin/participants" style={{ color: 'inherit', textDecoration: 'none' }}>Participants</Link></Button>
            </div>
            <Button color="inherit"><Link href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Login</Link></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}