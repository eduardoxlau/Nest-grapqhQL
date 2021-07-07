const listsMock = {
  query: `
  {
      getLists{
          id
          name
          movies{
              id
              videos{
                  id
                  type
                  size
              }
              genres{
                  id
                  name
              }
          }
      }
  }
  `,
  response: {
    id: 30,
    name: "Rafel's list",
    movies: [
      {
        id: 438,
        videos: [
          {
            id: 61,
            type: 'image',
            size: 'application/vnd.unity',
          },
        ],
        genres: [
          {
            id: 24,
            name: 'Family',
          },
        ],
      },
    ],
  },
};

const createList = {
  mutation: `mutation {
    createList(input:{
      name: "Rafel's list new",
    }){
      id
      public
      name
      movies{
        id
        title
      }
    }
  }`,
  response: {
    id: 31,
    public: true,
    name: 'Rafel`s list new',
    movies: [],
  },
};

const addMovieToList = {
  mutation: `mutation {
    addMovieToList(input:{
      listId:30,
      movieId:438
    }){
      status
    }
  }`,
  response: {
    status: 'success',
  },
};

export { listsMock, createList, addMovieToList };
