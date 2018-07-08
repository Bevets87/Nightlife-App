export const insertBars = (connection) => (bars) => {
  
  return connection.collections.bars.insertMany(bars) 
}

export const dropBars = (connection) => {
  return connection.collections.bars.drop()
}

export const insertUsers = (connection) => (users) => {
  const User = connection.model('User')
  return Promise.all(users.map(user => {
    user = new User(user)
    return user.save()
  }))
}

export const dropUsers = (connection) => {
  return connection.collections.users.drop()
}



