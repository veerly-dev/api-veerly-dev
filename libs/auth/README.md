# auth

This library was generated with [Nx](https://nx.dev).

mutation {
signUp(input: {
name: "Veera",
email: "veera@example.com",
password: "mypassword"
}) {
message
token
}
}

mutation {
signIn(input: {
email: "veera@example.com",
password: "mypassword"
}) {
message
token
}
}
