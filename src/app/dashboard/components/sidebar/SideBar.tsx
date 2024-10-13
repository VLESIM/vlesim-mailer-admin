import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { MenuItemData } from './interfaces';
import { menuItems } from './data';

const drawerWidth = '276px';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.light,
    marginTop: '64px',
    paddingTop: '15px',
  },
}));

const NestedListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));

const SidebarMenuItem: React.FC<MenuItemData> = ({
  title,
  icon,
  subItems,
  path,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
          {subItems && (open ? <ExpandMore /> : <KeyboardArrowRightIcon />)}
        </ListItemButton>
      </ListItem>
      {subItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((item, index) => (
              <NestedListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </NestedListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar: React.FC = () => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <SidebarMenuItem key={index} {...item} />
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
