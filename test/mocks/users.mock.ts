const loginMock = {
  mutation: `
mutation {
    login(input:{email:"someone@gmail.com",password:"pass"}){
        access_token
    }
}
`,
  response: {
    access_token: 'whatever',
  },
};

const createUserMock = {
  mutation: ` mutation { createUser(input:{email:"other@gmail.com",full_name:"xxxx",photo_path:"xxxx",password:"xxxxx"}){
        id
        email
        full_name
      }}`,
  response: {
    id: 68,
    email: 'other@gmail.com',
    full_name: 'xxx',
  },
};

const getUserMock = {
  query: `{
    getUser{
      id
      email
      full_name
      photo_path
      lists{
        id
        name
      }
    }
  }`,
  response: {
    id: 67,
    email: 'sanchezpazrafael@gmail.com',
    full_name: 'rafael sanchez paz',
    photo_path: 'ss',
    lists: [
      {
        id: 30,
        name: 'Rafel`s list',
      },
      {
        id: 31,
        name: 'Rafel`s list new',
      },
    ],
  },
};
export { loginMock, createUserMock, getUserMock };
