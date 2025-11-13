// client/tests/allPerksPage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ Adjust this path if your component is named/located differently
// e.g. '../src/pages/AllPerks.jsx' or '../src/pages/AllPerksPage.jsx'
import AllPerksPage from '../src/pages/AllPerks.jsx';

describe('AllPerksPage', () => {
  const mockPerks = [
    {
      _id: '1',
      title: 'Free Coffee Monday',
      description: 'Get a free coffee every Monday.',
      category: 'food',
      discountPercent: 100,
      merchant: 'Campus Coffee'
    },
    {
      _id: '2',
      title: 'Gym Membership 50% Off',
      description: 'Half-price annual gym membership.',
      category: 'health',
      discountPercent: 50,
      merchant: 'GUC Gym'
    }
  ];

  beforeEach(() => {
    // Mock the global fetch used by the page to load perks
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockPerks
    });
  });

  afterEach(() => {
    // Clean up fetch mock so it doesn't leak between tests
    global.fetch.mockRestore();
  });

  test('renders the perks returned from the API', async () => {
    render(
      <MemoryRouter>
        <AllPerksPage />
      </MemoryRouter>
    );

    // Wait for first perk to appear
    expect(
      await screen.findByText(/Free Coffee Monday/i)
    ).toBeInTheDocument();

    // And the second one should also be visible
    expect(
      screen.getByText(/Gym Membership 50% Off/i)
    ).toBeInTheDocument();

    // Optionally check that descriptions are rendered too
    expect(
      screen.getByText(/Get a free coffee every Monday./i)
    ).toBeInTheDocument();
  });
});
