import { SvgIcon, SxProps, Theme } from '@mui/material';

interface CheckIconProps {
  sx?: SxProps<Theme>;
  fill?: string;
}

export const CheckIcon = ({ sx, fill }: CheckIconProps) => {
  return (
    <SvgIcon sx={{ ...sx }}>
      <svg
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.7 10C22.7 15.5229 17.7751 20 11.7 20C5.6248 20 0.699951 15.5229 0.699951 10C0.699951 4.47714 5.6248 0 11.7 0C17.7751 0 22.7 4.47714 22.7 10ZM10.4276 15.2949L18.5889 7.87556C18.866 7.62363 18.866 7.21512 18.5889 6.96319L17.5853 6.05081C17.3081 5.79883 16.8588 5.79883 16.5816 6.05081L9.92576 12.1015L6.8183 9.27657C6.54117 9.02464 6.09181 9.02464 5.81464 9.27657L4.81102 10.189C4.53389 10.4409 4.53389 10.8494 4.81102 11.1013L9.42393 15.2949C9.7011 15.5469 10.1504 15.5469 10.4276 15.2949Z"
          fill={fill ?? '#22BB55'}
        />
      </svg>
    </SvgIcon>
  );
};
