import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BoyIcon from '@mui/icons-material/Boy';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routeNames';
import { cabinTypes, type CabinType } from '../../constants/constants';
import { useGetFlights } from '../../hooks/useGetFlights';

const maxShownPassengerCount = 3;

export const SearchFlightPage = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [cabinType, setCabinType] = useState<CabinType>(cabinTypes.ECONOMY);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const { palette } = useTheme();

  const { flights } = useGetFlights();

  return (
    <>
      <Helmet title="Uçuş Sorgulama" />
      <Stack
        sx={{
          height: '100vh',
          width: '100%',
          backgroundColor: palette.tertiary.main,
        }}
      >
        <Stack sx={{ gap: 4, marginTop: '10vh', alignItems: 'center' }}>
          <Stack sx={{ textAlign: 'center', color: palette.white.main }}>
            <Typography variant="h5" lineHeight={0.5}>
              Merhaba
            </Typography>
            <Typography variant="h6">Nereyi Keşfetmek İstersiniz?</Typography>
          </Stack>
          <Stack
            sx={{
              gap: 2,
              padding: 4,
              flexDirection: { desktop: 'row', mobile: 'column' },
              backgroundColor: `${palette.slategray.main}99`,
            }}
          >
            <TextField
              placeholder="Nereden"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoffIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ borderRadius: 1, backgroundColor: palette.white.main }}
              value={origin}
              onChange={({ target: { value } }) => setOrigin(value)}
            />
            <TextField
              placeholder="Nereye"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightLandIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ borderRadius: 1, backgroundColor: palette.white.main }}
              value={destination}
              onChange={({ target: { value } }) => setDestination(value)}
            />
            <TextField
              placeholder="Tarih"
              disabled
              sx={{ borderRadius: 1, backgroundColor: palette.white.main }}
            />
            <Stack
              sx={{
                width: { desktop: '140px', mobile: '100%' },
                position: 'relative',
                alignItems: 'end',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: palette.tertiary.dark,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              {passengerCount <= maxShownPassengerCount ? (
                Array(passengerCount)
                  .fill(0)
                  .map((_, index) => (
                    <BoyIcon
                      key={index}
                      style={{ fontSize: '32px', color: palette.grey[500] }}
                    />
                  ))
              ) : (
                <Stack sx={{ flexDirection: 'row' }}>
                  {Array(maxShownPassengerCount)
                    .fill(0)
                    .map((_, index) => (
                      <BoyIcon
                        key={index}
                        style={{ fontSize: '32px', color: palette.grey[500] }}
                      />
                    ))}
                  <AddIcon
                    style={{ fontSize: '32px', color: palette.grey[600] }}
                  />
                </Stack>
              )}
              <Box
                sx={{
                  top: '8px',
                  right: '8px',
                  position: 'absolute',
                  color: palette.white.main,
                }}
              >
                {passengerCount}
              </Box>
            </Stack>
            <Popover
              onClose={() => setAnchorEl(null)}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              sx={{ marginTop: 2 }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Stack sx={{ gap: 3, padding: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={palette.text.secondary}
                >
                  Kabin ve Yolcu Seçimi
                </Typography>
                <RadioGroup
                  row
                  value={cabinType}
                  onChange={({ target: { value } }) => {
                    setCabinType(value as CabinType);
                  }}
                >
                  <FormControlLabel
                    value={cabinTypes.ECONOMY}
                    control={<Radio />}
                    label="Economy Class"
                  />
                  <FormControlLabel
                    value={cabinTypes.BUSINESS}
                    control={<Radio />}
                    label="Business Class"
                  />
                </RadioGroup>
                <Stack
                  sx={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>Yolcu</Typography>
                  <Stack
                    sx={{ gap: 4, flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      disabled={passengerCount < 2}
                      onClick={() =>
                        setPassengerCount((prevState) => --prevState)
                      }
                    >
                      <RemoveIcon />
                    </Button>
                    <Typography>{passengerCount}</Typography>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() =>
                        setPassengerCount((prevState) => ++prevState)
                      }
                    >
                      <AddIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Popover>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (!flights.data) return;

                if (
                  flights.data.findIndex((fligth) => {
                    return (
                      origin === fligth.originAirport.city.name &&
                      destination === fligth.destinationAirport.city.name
                    );
                  }) > -1
                ) {
                  navigate(
                    `${ROUTES['/flights']}?origin=${origin}&destination=${destination}&passengerCount=${passengerCount}&cabinType=${cabinType}`
                  );
                  return;
                }
                setErrorModalOpen(true);
              }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {errorModalOpen && (
        <Dialog
          open={errorModalOpen}
          onClose={() => {
            setErrorModalOpen(false);
          }}
        >
          <Box sx={{ padding: 10 }}>
            <Typography>Arama sonucu bulunamadı</Typography>
          </Box>
        </Dialog>
      )}
    </>
  );
};
