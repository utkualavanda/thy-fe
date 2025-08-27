import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spinner } from '../../../../components/Spinner/Spinner';
import { ROUTES } from '../../../../routes/routeNames';
import {
  cabinTypes,
  promotionRate,
  type CabinType,
} from '../../constants/constants';
import {
  useGetFlights,
  type FareCategorySubCategory,
  type Flight,
} from '../../hooks/useGetFlights';
import { timeStringToMinutes } from '../../utils/timeStringToMinutes';

interface SelectedFlight {
  index: number;
  cabinType: CabinType;
}

export const FlightListPage = () => {
  const [sortedFlightList, setSortedFlightList] = useState<Flight[]>([]);
  const [sortBy, setSortBy] = useState<'eco-fly' | 'departure-time'>('eco-fly');
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<SelectedFlight | null>(
    null
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { palette } = useTheme();

  const { flights } = useGetFlights();

  const origin = DOMPurify.sanitize(searchParams.get('origin') || '');
  const destination = DOMPurify.sanitize(searchParams.get('destination') || '');
  const passengerCount = DOMPurify.sanitize(
    searchParams.get('passengerCount') || ''
  );
  const cabinType =
    searchParams.get('cabinType') === cabinTypes.BUSINESS
      ? 'BUSINESS'
      : 'ECONOMY';

  const getBrandPrice = (flight: Flight) => {
    const sub = flight.fareCategories[cabinType].subcategories.find(
      (s) => s.brandCode === 'ecoFly'
    );
    return sub ? sub.price.amount : Infinity;
  };

  useEffect(() => {
    if (!flights.data?.length) return;

    const copiedFlightList = [...flights.data];

    if (selectedFlight) {
      setSelectedFlight(null);
    }

    if (sortBy === 'eco-fly') {
      copiedFlightList.sort((a, b) => {
        const priceA = getBrandPrice(a);
        const priceB = getBrandPrice(b);
        return priceA - priceB;
      });
      setSortedFlightList(copiedFlightList);
      return;
    }

    if (sortBy === 'departure-time') {
      copiedFlightList.sort((a, b) => {
        return (
          timeStringToMinutes(a.departureDateTimeDisplay) -
          timeStringToMinutes(b.departureDateTimeDisplay)
        );
      });
      setSortedFlightList(copiedFlightList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flights.data, sortBy]);

  const handleFlightSelect = ({
    selectedFlight,
    brandCode,
  }: {
    selectedFlight: SelectedFlight;
    brandCode: {
      BUSINESS?: FareCategorySubCategory;
      ECONOMY?: FareCategorySubCategory;
    };
  }) => {
    navigate({
      pathname: ROUTES['/flights/result'],
      search: `?status=${
        brandCode[selectedFlight.cabinType]?.status === 'AVAILABLE'
          ? `success&payment=${String(brandCode[selectedFlight.cabinType]?.price.currency) + (Number(passengerCount) * (isPromotionEnabled ? Number(brandCode[selectedFlight.cabinType]?.price.amount) * promotionRate : brandCode[selectedFlight.cabinType]?.price.amount || 0)).toFixed(2)}`
          : 'failed'
      }`,
    });
  };

  return (
    <>
      <Helmet title="Uçuş Listeleme" />
      <Stack sx={{ width: '80%', marginX: 'auto', marginTop: 10, gap: 4 }}>
        <Box
          sx={{
            paddingY: 1,
            paddingX: 10,
            width: 'fit-content',
            backgroundColor: palette.secondary.main,
          }}
        >
          <Typography variant="body2" color={palette.white.main}>
            Uçuş
          </Typography>
        </Box>
        <Typography variant="h5">{`${origin} - ${destination}, ${passengerCount} Yolcu`}</Typography>
        <Stack sx={{ gap: 3, flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant="body2">Promosyon Kodu</Typography>
          <Switch
            checked={isPromotionEnabled}
            onChange={({ target: { checked } }) => {
              setIsPromotionEnabled(checked);
            }}
          />
        </Stack>
        {isPromotionEnabled && (
          <Stack sx={{ gap: 2 }}>
            <Typography variant="caption">
              Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini
              %50 indirimle satın alabilirsiniz!
            </Typography>
            <Typography variant="caption">
              Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim
              yapılarmamaktadir.
            </Typography>
          </Stack>
        )}
        <Stack>
          <Stack
            sx={{
              gap: 2,
              padding: 2,
              alignItems: 'center',
              flexDirection: 'row',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              color: palette.white.main,
              justifyContent: 'flex-end',
              backgroundColor: palette.tertiary.dark,
            }}
          >
            <Typography variant="caption">Sıralama Kriteri</Typography>
            <Typography
              variant="caption"
              sx={{
                border: `1px solid ${palette.white.main}`,
                paddingY: 0.25,
                paddingX: 3,
                borderRadius: 1,
                ...(sortBy === 'eco-fly'
                  ? { pointerEvents: 'none' }
                  : {
                      cursor: 'pointer',
                    }),
              }}
              onClick={() => {
                setSortBy('eco-fly');
              }}
            >
              Ekonomi Kabin Ücreti
            </Typography>
            <Typography
              variant="caption"
              sx={{
                border: `1px solid ${palette.white.main}`,
                paddingY: 0.25,
                paddingX: 3,
                borderRadius: 1,
                ...(sortBy === 'departure-time'
                  ? { pointerEvents: 'none' }
                  : {
                      cursor: 'pointer',
                    }),
              }}
              onClick={() => {
                setSortBy('departure-time');
              }}
            >
              Kalkış Saati
            </Typography>
          </Stack>
          <Stack
            sx={{
              gap: 2,
              padding: 4,
              backgroundColor: palette.background.default,
            }}
          >
            {flights.isLoading ? (
              <Spinner />
            ) : (
              <>
                {sortedFlightList.length > 0 &&
                  sortedFlightList.map((flight, index) => {
                    const ecoFly = {
                      BUSINESS:
                        flight.fareCategories.BUSINESS.subcategories.find(
                          (category) => category.brandCode === 'ecoFly'
                        ),
                      ECONOMY: flight.fareCategories.ECONOMY.subcategories.find(
                        (category) => category.brandCode === 'ecoFly'
                      ),
                    };
                    const extraFly = {
                      BUSINESS:
                        flight.fareCategories.BUSINESS.subcategories.find(
                          (category) => category.brandCode === 'extraFly'
                        ),
                      ECONOMY: flight.fareCategories.ECONOMY.subcategories.find(
                        (category) => category.brandCode === 'extraFly'
                      ),
                    };
                    const primeFly = {
                      BUSINESS:
                        flight.fareCategories.BUSINESS.subcategories.find(
                          (category) => category.brandCode === 'primeFly'
                        ),
                      ECONOMY: flight.fareCategories.ECONOMY.subcategories.find(
                        (category) => category.brandCode === 'primeFly'
                      ),
                    };
                    return (
                      <Fragment key={flight.id}>
                        <Stack
                          sx={{
                            gap: 3,
                            flexDirection: { desktop: 'row', mobile: 'column' },
                          }}
                        >
                          <Stack
                            sx={{
                              padding: 4,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              gap: 10,
                              flex: '1 1 calc(50% - 12px/3)',
                              backgroundColor: palette.white.main,
                            }}
                          >
                            <Stack
                              sx={{
                                gap: 1,
                                width: '100%',
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}
                            >
                              <Stack sx={{ gap: 1 }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {flight.departureDateTimeDisplay}
                                </Typography>
                                <Stack>
                                  <Typography variant="caption">
                                    {flight.originAirport.code}
                                  </Typography>
                                  <Typography variant="caption">
                                    {flight.originAirport.city.name}
                                  </Typography>
                                </Stack>
                              </Stack>
                              <div
                                style={{
                                  display: 'inline-block',
                                  width: '100%',
                                  backgroundColor: palette.text.secondary,
                                  height: '2px',
                                }}
                              />
                              <Stack sx={{ gap: 1, textAlign: 'right' }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {flight.arrivalDateTimeDisplay}
                                </Typography>
                                <Stack>
                                  <Typography variant="caption">
                                    {flight.destinationAirport.code}
                                  </Typography>
                                  <Typography variant="caption">
                                    {flight.destinationAirport.city.name}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                            <Stack
                              sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{ whiteSpace: 'nowrap' }}
                              >
                                Uçuş Süresi
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {flight.flightDuration}
                              </Typography>
                            </Stack>
                          </Stack>
                          {ecoFly['ECONOMY'] && (
                            <Stack
                              sx={{
                                flex: '1 1 calc(25% - 12px/3)',
                                cursor: 'pointer',
                                padding: 3,
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,.05)',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: palette.white.main,
                              }}
                              onClick={() => {
                                if (
                                  index === selectedFlight?.index &&
                                  selectedFlight?.cabinType === 'ECONOMY'
                                ) {
                                  setSelectedFlight(null);
                                  return;
                                }
                                setSelectedFlight({
                                  cabinType: 'ECONOMY',
                                  index,
                                });
                              }}
                            >
                              <Stack
                                sx={{
                                  gap: 2,
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <Radio
                                  checked={
                                    selectedFlight?.index === index &&
                                    selectedFlight?.cabinType === 'ECONOMY'
                                  }
                                />
                                <Typography>ECONOMY</Typography>
                                <Stack sx={{ textAlign: 'start' }}>
                                  <Typography>Yolcu Başına</Typography>
                                  <Typography fontWeight={600}>
                                    {ecoFly['ECONOMY'].price.currency +
                                      ' ' +
                                      (isPromotionEnabled
                                        ? ecoFly['ECONOMY'].price.amount *
                                          promotionRate
                                        : ecoFly['ECONOMY'].price.amount)}
                                  </Typography>
                                </Stack>
                              </Stack>
                              {index === selectedFlight?.index &&
                              selectedFlight?.cabinType === 'ECONOMY' ? (
                                <ExpandMoreIcon />
                              ) : (
                                <ExpandLessIcon />
                              )}
                            </Stack>
                          )}
                          {ecoFly['BUSINESS'] && (
                            <Stack
                              sx={{
                                flex: '1 1 calc(25% - 12px/3)',
                                cursor: 'pointer',
                                padding: 3,
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,.05)',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: palette.white.main,
                              }}
                              onClick={() => {
                                if (
                                  index === selectedFlight?.index &&
                                  selectedFlight?.cabinType === 'BUSINESS'
                                ) {
                                  setSelectedFlight(null);
                                  return;
                                }

                                setSelectedFlight({
                                  cabinType: 'BUSINESS',
                                  index,
                                });
                              }}
                            >
                              <Stack
                                sx={{
                                  gap: 2,
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <Radio
                                  checked={
                                    selectedFlight?.index === index &&
                                    selectedFlight?.cabinType === 'BUSINESS'
                                  }
                                />
                                <Typography>BUSINESS</Typography>
                                <Stack sx={{ textAlign: 'start' }}>
                                  <Typography>Yolcu Başına</Typography>
                                  <Typography fontWeight={600}>
                                    {ecoFly['BUSINESS']?.price.currency +
                                      ' ' +
                                      (isPromotionEnabled
                                        ? ecoFly['BUSINESS']?.price.amount *
                                          promotionRate
                                        : ecoFly['BUSINESS']?.price.amount)}
                                  </Typography>
                                </Stack>
                              </Stack>
                              {index === selectedFlight?.index &&
                              selectedFlight?.cabinType === 'BUSINESS' ? (
                                <ExpandMoreIcon />
                              ) : (
                                <ExpandLessIcon />
                              )}
                            </Stack>
                          )}
                        </Stack>
                        <Collapse in={index === selectedFlight?.index}>
                          {!!selectedFlight?.cabinType && (
                            <Stack
                              sx={{
                                gap: 3,
                                padding: 4,
                                flexDirection: {
                                  desktop: 'row',
                                  mobile: 'column',
                                },
                                backgroundColor: palette.white.main,
                              }}
                            >
                              <Stack sx={{ flex: 1 }}>
                                <Stack
                                  sx={{
                                    padding: '16px 8px 24px',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: palette.background.default,
                                  }}
                                >
                                  <Typography fontWeight={600}>
                                    Eco Fly
                                  </Typography>
                                  <Stack sx={{ gap: 1, flexDirection: 'row' }}>
                                    <Typography variant="caption">
                                      {
                                        ecoFly[selectedFlight.cabinType]?.price
                                          .currency
                                      }
                                    </Typography>
                                    <Typography fontWeight={600}>
                                      {isPromotionEnabled &&
                                      ecoFly[selectedFlight.cabinType]
                                        ? Number(
                                            ecoFly[selectedFlight.cabinType]
                                              ?.price.amount
                                          ) * promotionRate
                                        : ecoFly[selectedFlight.cabinType]
                                            ?.price.amount}
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Box
                                  sx={{
                                    border: `1px solid ${palette.text.disabled}`,
                                    minHeight: '200px',
                                    borderBottom: 'none',
                                  }}
                                >
                                  {ecoFly[selectedFlight.cabinType]?.rights.map(
                                    (right) => (
                                      <Stack
                                        key={right}
                                        sx={{
                                          padding: 2,
                                          borderBottom: `1px solid ${palette.text.disabled}`,
                                        }}
                                      >
                                        {right}
                                      </Stack>
                                    )
                                  )}
                                </Box>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="large"
                                  sx={{
                                    borderRadius: 0,
                                    textTransform: 'capitalize',
                                  }}
                                  onClick={() =>
                                    handleFlightSelect({
                                      selectedFlight,
                                      brandCode: ecoFly,
                                    })
                                  }
                                >
                                  Uçuşu Seç
                                </Button>
                              </Stack>
                              <Stack sx={{ flex: 1 }}>
                                <Stack
                                  sx={{
                                    padding: '16px 8px 24px',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: palette.background.default,
                                  }}
                                >
                                  <Typography fontWeight={600}>
                                    Extra Fly
                                  </Typography>
                                  <Stack sx={{ gap: 1, flexDirection: 'row' }}>
                                    <Typography variant="caption">
                                      {
                                        extraFly[selectedFlight.cabinType]
                                          ?.price.currency
                                      }
                                    </Typography>
                                    <Typography fontWeight={600}>
                                      {
                                        extraFly[selectedFlight.cabinType]
                                          ?.price.amount
                                      }
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Box
                                  sx={{
                                    border: `1px solid ${palette.text.disabled}`,
                                    minHeight: '200px',
                                    borderBottom: 'none',
                                  }}
                                >
                                  {extraFly[
                                    selectedFlight.cabinType
                                  ]?.rights.map((right) => (
                                    <Stack
                                      key={right}
                                      sx={{
                                        padding: 2,
                                        borderBottom: `1px solid ${palette.text.disabled}`,
                                      }}
                                    >
                                      {right}
                                    </Stack>
                                  ))}
                                </Box>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="large"
                                  sx={{
                                    borderRadius: 0,
                                    textTransform: 'capitalize',
                                  }}
                                  disabled={isPromotionEnabled}
                                  onClick={() => {
                                    handleFlightSelect({
                                      selectedFlight,
                                      brandCode: extraFly,
                                    });
                                  }}
                                >
                                  Uçuşu Seç
                                </Button>
                              </Stack>
                              <Stack sx={{ flex: 1 }}>
                                <Stack
                                  sx={{
                                    padding: '16px 8px 24px',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: palette.background.default,
                                  }}
                                >
                                  <Typography fontWeight={600}>
                                    Prime Fly
                                  </Typography>
                                  <Stack sx={{ gap: 1, flexDirection: 'row' }}>
                                    <Typography variant="caption">
                                      {
                                        primeFly[selectedFlight.cabinType]
                                          ?.price.currency
                                      }
                                    </Typography>
                                    <Typography fontWeight={600}>
                                      {
                                        primeFly[selectedFlight.cabinType]
                                          ?.price.amount
                                      }
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Box
                                  sx={{
                                    border: `1px solid ${palette.text.disabled}`,
                                    minHeight: '200px',
                                    borderBottom: 'none',
                                  }}
                                >
                                  {primeFly[
                                    selectedFlight.cabinType
                                  ]?.rights.map((right) => (
                                    <Stack
                                      key={right}
                                      sx={{
                                        padding: 2,
                                        borderBottom: `1px solid ${palette.text.disabled}`,
                                      }}
                                    >
                                      {right}
                                    </Stack>
                                  ))}
                                </Box>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="large"
                                  sx={{
                                    borderRadius: 0,
                                    textTransform: 'capitalize',
                                  }}
                                  disabled={isPromotionEnabled}
                                  onClick={() => {
                                    handleFlightSelect({
                                      selectedFlight,
                                      brandCode: primeFly,
                                    });
                                  }}
                                >
                                  Uçuşu Seç
                                </Button>
                              </Stack>
                            </Stack>
                          )}
                        </Collapse>
                      </Fragment>
                    );
                  })}
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
