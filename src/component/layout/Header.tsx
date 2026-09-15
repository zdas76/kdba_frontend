import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { LogoutOutlined } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        KBDA LOGO
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">HOME</Link>
                    </Typography>
                    <Button color="inherit" sx={{ fontWeight: 700, fontSize: '15px' }}><LogoutOutlined fontSize='medium' sx={{ marginRight: '5px' }} /> Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}