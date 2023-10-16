export type Character = {
  id: number;
  name: string;
  source: string;
  defensePoints: number;
};

export type AttackResult = {
  success: boolean;
  attackPoints: number;
  defensePoints: number;
};
