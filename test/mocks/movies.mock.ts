const data = {
  meta: {
    itemCount: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
    currentPage: 1,
  },
  items: [
    {
      id: 441,
      title: 'Senior Creative Orchestrator',
      tagline: 'text',
      videos: [
        {
          id: 66,
          size: 'application/cea',
        },
      ],
      genres: [
        {
          id: 27,
          name: 'Action',
        },
      ],
    },
  ],
};

const query = `
{
    getMovies(search:"senior"){
       meta{
        itemCount
        itemsPerPage
        totalItems
        totalPages
        currentPage
      }
       items{
        id
        title
        tagline
        id
        videos{
          id
          size
        }
        genres{
          id
          name
        }
      }
    }
  }`;

export { data, query };
