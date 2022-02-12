import { Author } from "../types/configuration";

interface Authors {
  [key: string]: Author;
}

const authors: Authors = {
  DSRKafuU: {
    name: 'Roxy | 宇宙和音',
    link: 'https://github.com/dsrkafuu',
  },
  j0sh77: {
    name: 'Jimmy Lolo | Malboro',
    link: 'https://na.finalfantasyxiv.com/lodestone/character/6170027/',
  },
};

export default authors;
