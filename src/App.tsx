import React, { useEffect, useState } from 'react';
import './App.css';
import attackEnemy from './service/attackEnemy';
import { AttackResult, Character } from './types';

const DEFAULT_DICE_SIZE = 4;

function App() {
  const [diceQuantity, setDiceQuantity] = useState(1);
  const [diceSize, setDiceSize] = useState(DEFAULT_DICE_SIZE);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(1);
  const [attackResult, setAttackResult] = useState<AttackResult | null>(null);

  useEffect(() => {
    fetch('https://api-trybe-characters.vercel.app/api/characters')
      .then((res) => res.json())
      .then((data) => setCharacters(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'diceQuantity') setDiceQuantity(Number(value));
    if (name === 'diceSize') setDiceSize(Number(value));
    if (name === 'selectedCharacterId') setSelectedCharacterId(Number(value));
    setAttackResult(null);
  };

  const handleClickAttack = () => {
    const enemy = characters.find(
      (character) => character.id === selectedCharacterId,
    );
    setAttackResult(attackEnemy(diceQuantity, diceSize, enemy));
  };

  const selectedCharacter = characters.length
    ? characters.find(
      (character) => character.id === selectedCharacterId,
    )
    : null;

  return (
    <main>
      <h1>⚔️ Trybe RPG Battle</h1>
      <hr />
      <div className="select-item">
        1. Quantos dados você quer usar?
        <select
          name="diceQuantity"
          id="diceQuantity"
          value={ diceQuantity }
          onChange={ handleChange }
        >
          <option value="1">1 Dado</option>
          <option value="2">2 Dados</option>
          <option value="3">3 Dados</option>
        </select>
      </div>
      <div className="select-item">
        2. Número de Faces do seu Dado
        <select
          name="diceSize"
          id="diceSize"
          value={ diceSize }
          onChange={ handleChange }
        >
          <option value="4">D04</option>
          <option value="6">D06</option>
          <option value="8">D08</option>
          <option value="10">D10</option>
          <option value="12">D12</option>
          <option value="20">D20</option>
        </select>
      </div>
      <div className="select-item">
        3. Escolha um Personagem para Atacar
        <select
          name="selectedCharacterId"
          id="selectedCharacterId"
          value={ selectedCharacterId }
          onChange={ handleChange }
        >
          {characters.map((character) => (
            <option key={ character.id } value={ character.id }>
              {character.name}
            </option>
          ))}
        </select>
      </div>
      <hr />
      {selectedCharacter && (
        <>
          <h2>Seu Oponente:</h2>
          <h3>{selectedCharacter.name}</h3>
          <p>
            Origem:
            {' '}
            {selectedCharacter.source}
          </p>
          <p>
            Defesa:
            {' '}
            {selectedCharacter.defensePoints}
          </p>
        </>
      )}
      {attackResult && (
        <div className="battle">
          <hr />
          <h2>Resultado da Batalha</h2>
          <h3 style={ { color: attackResult.success ? 'lightgreen' : 'tomato' } }>
            {attackResult.success ? 'Você Venceu!' : 'Você Perdeu!'}
          </h3>
          <h4>
            Resultado nos dados:
            {' '}
            {attackResult.attackPoints}
          </h4>
          <h4>
            Defesa de
            {' '}
            {selectedCharacter && selectedCharacter.name}
            :
            {' '}
            {attackResult.defensePoints}
          </h4>
        </div>
      )}
      <hr />
      <button type="button" onClick={ handleClickAttack }>
        Atacar
      </button>
    </main>
  );
}

export default App;
