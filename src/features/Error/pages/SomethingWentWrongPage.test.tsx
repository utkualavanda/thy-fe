import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SomethingWentWrongPage } from './SomethingWentWrongPage';

describe('SomethingWentWrongPage', () => {
  it('renders the error message', () => {
    render(<SomethingWentWrongPage />);
    expect(screen.getByText('Bir şeyler yanlış gitti!')).toBeInTheDocument();
  });
});
