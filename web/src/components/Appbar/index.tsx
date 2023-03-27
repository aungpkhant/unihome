import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { Menu, MenuItem, Modal } from '@mui/material';
import { Tableau } from 'components/Tableau/Tableau';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1200px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function Appbar() {
  const [dataset, setDataset] = React.useState<'rent' | 'pt' | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuIsOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDatasetClick = (datasetType: 'rent' | 'pt') => {
    setAnchorEl(null);
    setDataset(datasetType);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UniHome
          </Typography>
          <Box>
            <Button
              variant="text"
              color="secondary"
              id="basic-button"
              aria-controls={menuIsOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuIsOpen ? 'true' : undefined}
              onClick={handleClick}
            >
              Explore Datasets
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuIsOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleDatasetClick('rent');
                }}
              >
                Rent
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDatasetClick('pt');
                }}
              >
                Public Transport
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal open={dataset !== null} onClose={() => setDataset(null)}>
        <Box sx={style}>
          {dataset === 'rent' && (
            <Tableau url={'https://public.tableau.com/views/RentalTrendsinVictoria/Dashboard2'} />
          )}
          {dataset === 'pt' && (
            <Tableau
              url={
                'https://public.tableau.com/views/PublicTransportAvailabilityinVictoria/Dashboard1'
              }
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
