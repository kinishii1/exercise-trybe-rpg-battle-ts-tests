import { vi } from 'vitest';
import rollDice from '../service/rollDice';

it('testa a função `rollDice`', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.8);
  const result = rollDice();
  expect(result).toEqual(16);
  expect(Math.random).toHaveBeenCalledTimes(1);
});
