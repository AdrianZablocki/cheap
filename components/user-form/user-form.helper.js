export const formConfig = [
  {
    id: 'name',
    value: '',
    type: 'text',
    label: 'Nazwa',
    onChange: setName,
    placeholder: 'Wpisz nick',
    autoComplete: 'username'
  },
  {
    id: 'email',
    value: '',
    type: 'email',
    label: 'Adres e-mail',
    onChange: setEmail,
    placeholder: 'Podaj email',
    autoComplete: 'username'
  },
  {
    id: 'password',
    value: '',
    type: 'password',
    label: 'Hasło',
    onChange: setPassword,
    placeholder: 'Wpisz hasło',
    autoComplete: 'new-password'
  }
]