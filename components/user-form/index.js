'use-client'

const UserForm = ({ handleSubmit, setEmail, setPassword, setRegion }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <label>email</label>
        <input onChange={(value) => setEmail(value.target.value)} />
      </fieldset>
      <fieldset>
        <label>hasło</label>
        <input onChange={(value) => setPassword(value.target.value)} />
      </fieldset>
      {setRegion &&
        <fieldset>
          <label>region</label>
          <select onChange={(value) => setRegion(value.target.value)}>
            <option value="">Wybierz region</option>
            <option value="Lubelskie">Lubelskie</option>
            <option value="Małopolskie">Małopolskie</option>
            <option value="Mazowieckie">Mazowieckie</option>
          </select>
        </fieldset>
      }
      <button type="submit">Wyślij</button>
    </form>
  )
}
export default UserForm
