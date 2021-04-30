import logo from './logo.svg';
import './App.css';
import CharacterProvider, { useCharacters } from './context/character-context';
import ImageGallery from './components/ImageGallery';

function App() {
  const { characters, getCharacter, character } = useCharacters();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Examples</h1>
        {Object.values(character).length === 0 && (
          <img src={logo} className="App-logo" alt="logo" />
        )}

        {Object.values(character).length > 0 && (
          <img src={character.image} alt={character.name} />
        )}
        <ul style={{ listStyleType: 'none' }}>
          {characters.map((c) => {
            return (
              <li onClick={() => getCharacter(c.id)} key={c.id}>
                {' '}
                {c.name}{' '}
              </li>
            );
          })}
        </ul>
        <br />
        <ImageGallery />
      </header>
    </div>
  );
}

const AppWithContext = () => (
  <CharacterProvider>
    <App />
  </CharacterProvider>
);

export default AppWithContext;
