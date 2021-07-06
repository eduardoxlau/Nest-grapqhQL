const queryLists = `
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
`;

const getLists = {
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
};

export { getLists, queryLists };
