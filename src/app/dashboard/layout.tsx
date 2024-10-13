import theme from '../theme/theme';
import NavBar from './components/navbar/NavBar';
import Sidebar from './components/sidebar/SideBar';
import { Stack, SxProps } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[] | null;
  sx?: SxProps;
  fullHeight?: boolean;
};

export const Layout: React.FC<Props> = ({ children, fullHeight, sx }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        height: fullHeight ? '100%' : 'auto',
        px: 2,
        py: 7,
        pb: 2,
        gap: 2,
        borderRadius: '6px',
        overflowY: 'auto',
        display: 'flex',
        ...sx,
        bgcolor: theme.palette.primary.main,
      }}
      className={'pageLayout'}
    >
      <NavBar />
      <Sidebar />
      <Stack
        sx={{
          marginLeft: '276px',
          width: 'calc(100% - 276px)',
          alignItems: 'center',
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};
