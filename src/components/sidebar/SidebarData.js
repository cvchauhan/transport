import React from 'react';
import * as Icon from '@mui/icons-material';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icon.Home sx={{ color: 'white' }} />
  },
  {
    title: 'Lorry Receipt',
    path: '#',
    icon: <Icon.Receipt sx={{ color: 'white' }} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Json',
        path: '/lorry-json',
        icon: <Icon.Receipt />
      },
      // {
      //   title: 'PDF',
      //   path: '/lorry-pdf-form',
      //   icon:  <Icon.AccountBox sx={{ color: 'white' }} />
      // },
      {
        title: 'Manual',
        path: '/lorry-form',
        icon:  <Icon.AccountBox sx={{ color: 'white' }} />
      },
      {
        title: 'Lorry Details',
        path: '/lorry',
        icon:  <Icon.AccountBox sx={{ color: 'white' }} />
      }
    ]
  },
  
  {
    title: 'Party',
    path: '/party',
    icon: <Icon.AccountCircle style={{ color: 'white' }}/>
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
  {
    title: 'POD',
    path: '/pod-form',
    icon: <Icon.MenuBook style={{ color: 'white' }}/>
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <Icon.MenuBook style={{ color: 'white' }}/>
  },
];