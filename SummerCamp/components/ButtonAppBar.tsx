import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';

import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useRouter } from 'next/navigation';

import {UserData} from '@/app/types';
import '../app/globals.css';

export default function ButtonAppBar() {
  const { push } = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const data = useAuthUser<UserData>();
    const signOut = useSignOut();

    const logOutHandler = () => {
      signOut();
      push('/login');
  };
  return (
    <div style={{ width: "100%"}}>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ backgroundColor: "var(--admin-blue)"}}>
          <Toolbar>
            <img src="/franchiseLogo.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
            <div style={{ flexGrow: 1 }}>
              <Button color="inherit"><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></Button>
              <Button color="inherit" disabled={!isAuthenticated}><Link href="/admin/participants" style={{ color: 'inherit', textDecoration: 'none' }}>Participants</Link></Button>
            </div>
            <div style={{ marginRight: 16, fontSize: 16 }}>
              {data?.name}
            </div>
            <Button color="inherit" disabled={!isAuthenticated} style={{ backgroundColor: "#74708b"}} onClick={logOutHandler}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}