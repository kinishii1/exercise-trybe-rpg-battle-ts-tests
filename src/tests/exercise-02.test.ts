import { vi } from 'vitest';
import rollDice from '../service/rollDice';
import rollMultipleDice from '../service/rollMultipleDice';

it('testa a função `rollMultipleDice`', () => {
  vi.mock('../service/rollDice');
  (rollDice as jest.Mock).mockReturnValueOnce(4).mockReturnValueOnce(6);
  const result = rollMultipleDice(2);
  expect(result).toBe(10);
  expect(rollDice).toHaveBeenCalledTimes(2);
});
