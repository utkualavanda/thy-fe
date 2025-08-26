import { useTheme } from '@mui/material';
import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export const Spinner = (props: CircularProgressProps) => {
  const { palette } = useTheme();

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <CircularProgress
        {...props}
        sx={{ color: palette.primary.main, ...props.sx }}
      />
    </Stack>
  );
};
