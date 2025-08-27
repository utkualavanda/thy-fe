import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';

import { client } from './queryClient';
import { router } from './routes/routes';
import { breakpoints } from './theme/breakpoints';
import { palette } from './theme/palette';

function App() {
  client.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  });

  const theme = createTheme(
    {
      breakpoints,
      palette,
      spacing: 4,
    },
    {
      locale: 'en',
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            margin: 0,
          },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
