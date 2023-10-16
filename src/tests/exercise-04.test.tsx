import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

it('testa a requisição para a API', async () => {
  const mockedCharacters = [
    {
      id: 1,
      name: 'Shrek',
      source: 'Tao distante',
      defensePoints: 60,
    },
  ];
  vi.spyOn(global, 'fetch');
  (global.fetch as jest.Mock).mockResolvedValue({
    json: vi.fn().mockResolvedValue(mockedCharacters),
  });

  render(<App />);

  const characterName = await screen.findByRole('heading', {
    name: 'Shrek',
  });
  expect(characterName).toBeInTheDocument();
});
