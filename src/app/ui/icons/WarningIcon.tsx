import { SvgIcon, SxProps, Theme } from '@mui/material';

interface WarningIconProps {
  sx?: SxProps<Theme>;
  fill?: string;
}

export const WarningIcon = ({ sx, fill }: WarningIconProps) => {
  return (
    <SvgIcon sx={{ ...sx }}>
      <svg
        width="24"
        height="19"
        viewBox="0 0 24 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.12519 19H21.3747C23.2409 19 24.4042 17.1344 23.4711 15.6485L14.3463 1.11436C13.4133 -0.371454 11.0866 -0.371454 10.1536 1.11436L1.0288 15.6485C0.0957189 17.1344 1.25903 19 3.12519 19ZM12.25 11.1799C11.5835 11.1799 11.0382 10.6772 11.0382 10.0628V7.82846C11.0382 7.21402 11.5835 6.7113 12.25 6.7113C12.9164 6.7113 13.4617 7.21402 13.4617 7.82846V10.0628C13.4617 10.6772 12.9164 11.1799 12.25 11.1799ZM13.4617 15.6485H11.0382V13.4142H13.4617V15.6485Z"
          fill={fill ?? '#DB3838'}
        />
      </svg>
    </SvgIcon>
  );
};
