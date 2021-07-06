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
export { loginMock, createUserMock };
