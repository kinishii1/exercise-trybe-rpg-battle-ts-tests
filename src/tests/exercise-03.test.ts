import { vi } from 'vitest';
import rollMultipleDice from '../service/rollMultipleDice';
import attackEnemy from '../service/attackEnemy';

it('testa uma vitória na função `attackEnemy`', () => {
  vi.mock('../service/rollMultipleDice');
  (rollMultipleDice as jest.Mock).mockReturnValueOnce(31);
  const result = attackEnemy(1, 20, { defensePoints: 30 });
  expect(result.success).toEqual(true);
});

it('testa uma derrota na função `attackEnemy`', () => {
  vi.mock('../service/rollMultipleDice');
  (rollMultipleDice as jest.Mock).mockReturnValueOnce(29);
  const result = attackEnemy(1, 20, { defensePoints: 30 });
  expect(result.success).toEqual(false);
});

it('testa um empate nos dados, gerando derrota no `attackEnemy`', () => {
  vi.mock('../service/rollMultipleDice');
  (rollMultipleDice as jest.Mock).mockReturnValueOnce(30);
  const result = attackEnemy(1, 20, { defensePoints: 30 });
  expect(result.success).toEqual(false);
});
