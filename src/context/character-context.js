import axios from 'axios';
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useContext,
} from 'react';

// create context
const characterContext = createContext();

//types
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTER = 'GET_CHARACTER';

/// reducer
function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_CHARACTERS:
      return { ...state, characters: payload };

    case GET_CHARACTER:
      return { ...state, character: payload };

    default:
      return state;
  }
}

// state
const initialState = {
  characters: [],
  character: {},
  getCharacter: () => undefined,
};

// provider
export default function CharacterProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          'https://rickandmortyapi.com/api/character/'
        );

        dispatch({ type: GET_CHARACTERS, payload: data.results });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getCharacterData = async (id) => {
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      dispatch({ type: GET_CHARACTER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(
    () => ({
      characters: state.characters,
      getCharacter: getCharacterData,
      character: state.character,
    }),
    [state.characters, state.character]
  );
  return <characterContext.Provider value={value} {...props} />;
}

//custom hook
export const useCharacters = () => {
  const context = useContext(characterContext);
  if (!context) {
    throw new Error("Character context don't exists");
  }
  return context;
};
