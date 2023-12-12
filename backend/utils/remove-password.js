export const removePassword = (user) => {
  const userData = { ...user._doc }
  delete userData.password

  return userData
}