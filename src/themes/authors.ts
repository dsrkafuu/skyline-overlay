
type Author = {
  github?: {
    name: string,
    link: string,
  },
  ffxiv?: {
    name: string,
    world: string,
    link?: string,
  }
}

const authors: {[k: string]: Author} = {
  DSRKafuU: {
    github: {
      name: 'DSRKafuU',
      link: 'https://github.com/dsrkafuu',
    }
  },
  j0sh77: {
    ffxiv: {
      name: 'Jimmy Lolo',
      world: 'Malboro',
      link: 'https://na.finalfantasyxiv.com/lodestone/character/6170027/'
    }
  }
}

export default authors;