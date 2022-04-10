import React from 'react';
import * as Icon from '@mui/icons-material';
import * as RiIcons from 'react-icons/ri';
import ThreePSharpIcon from '@mui/icons-material/ThreePSharp';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icon.Home sx={{ color: 'white' }} />
  },
  {
    title: 'User',
    path: '/user',
    icon: <Icon.AccountCircle style={{ color: 'white' }}/>
  },
  {
    title: 'Lorry Receipt',
    path: '/lorry',
    icon: <Icon.Receipt sx={{ color: 'white' }} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Party',
    path: '/party',
    icon: <ThreePSharpIcon style={{ color: 'white' }}/>
  },
  
  {
    title: 'Suppliers',
    path: '/supplier',
    icon: <Icon.AccountBox style={{ color: 'white' }}/>
  },
  {
    title: 'Vehicles',
    path: '/vehicle',
    icon: <Icon.Commute style={{ color: 'white' }}/>
  },
  {
    title: 'Drivers',
    path: '/driver',
    icon: <Icon.AirlineSeatReclineNormal style={{ color: 'white' }}/>
  },
];