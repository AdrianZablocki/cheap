'use-client'
import { useRouter } from 'next/navigation'

import { getRegionList } from '@/utils'
import Input from '../UI/input'
import Select from '../UI/select'
import Button from '../UI/button'

import styles from './user-form.module.scss'
import Link from 'next/link'

const UserForm = ({ handleSubmit, setEmail, setPassword, setRegion, setName, setConsent }) => {
  const { push } = useRouter()

  const formConfig = [
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

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        {
          formConfig.map(field => 
            <Input
              key={`registrtion-form-${field.id}`}
              id={field.id}
              value={field.value}
              label={field.label}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              onChange={(e) => field.onChange(e.target.value)}
            />  
          )
        }
        <Select
          id="region"
          label="Region"
          value=""
          placeholder="Wybierz województwo"
          options={getRegionList()}
          onChange={(e) => setRegion(e.target.value)}
        />

      
        <fieldset className={styles.statute}>
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox_id"
            value="value"
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label for="checkbox_id">Akceputję
            <Link href="/regulamin" passHref>regulamin</Link>
            strony cheap weed&#42;
          </label>
        </fieldset>
    

        <div className={styles.actionsWrapper}>
          <Button type="submit" text="Zarejstruj się" buttonType="successFilled"/>
        </div>  

      </form>

      <div className={styles.actionsWrapper}>
        <div className={styles.activeUser}>Masz już konto?</div>
        <Button type="button" text="Zaloguj" buttonType="success" action={() => push('/login') }/>        
      </div>    
    </>

  )
}

export default UserForm
