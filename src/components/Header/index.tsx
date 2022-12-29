import { AppBar, Box, Toolbar } from '@mui/material';
import * as React from 'react';

export default function Header () {
  return (
    <div>
       <Box mb={4}>
            <AppBar position='static'>
                <Toolbar>
                    <h1>Chat app</h1>
                </Toolbar>
            </AppBar>
       </Box>
    </div>
  );
}
