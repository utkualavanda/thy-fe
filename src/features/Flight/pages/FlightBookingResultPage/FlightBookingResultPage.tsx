import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routeNames';

export const FlightBookingResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { palette } = useTheme();

  const payment = DOMPurify.sanitize(searchParams.get('payment') || '');
  const isPaymentSuccess =
    DOMPurify.sanitize(searchParams.get('status') || '') === 'success';

  return (
    <Stack
      sx={{
        gap: 4,
        width: '80%',
        marginX: 'auto',
        marginTop: 10,
      }}
    >
      <Stack sx={{ gap: 2, flexDirection: 'row' }}>
        {isPaymentSuccess ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CancelIcon color="error" />
        )}
        <Typography>
          {isPaymentSuccess
            ? 'Kabin seçiminiz tamamlandı.'
            : 'Kabin seçiminiz tamamlanamadı.'}
        </Typography>
      </Stack>
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          backgroundColor: palette.text.disabled,
          height: '1px',
        }}
      />
      {isPaymentSuccess ? (
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography>Toplam Tutar</Typography>
          <Typography>{payment}</Typography>
        </Stack>
      ) : (
        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate(ROUTES['/']);
            }}
          >
            Başa Dön
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
