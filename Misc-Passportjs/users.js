
const users = [
    {
        id: 1,
        email: 'abc@example.com',
        password: 'RANDOM_PASSWORD_ABC'
    },
    {
        id: 2,
        email: 'pqr@example.com',
        password: 'RANDOM_PASSWORD_PQR'
    },
    {
        id: 3,
        email: 'xyz@example.com',
        password: 'RANDOM_PASSWORD_XYZ'
    }
]

function findUser(email) {
    return users.find(user => user.email === email)
}

function findUserById(email) {
    return users.find(user => user.email === email)
}

function findUserByGithubId(id) {
    return users.find(user => user.githubId === id)
}

module.exports = {
    users,
    findUser,
    findUserById,
    findUserByGithubId
}