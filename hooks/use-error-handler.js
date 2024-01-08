import { useRouter, usePathname } from 'next/navigation'

export const errorStrategy = new Map([
  ['Unauthorized', 'Uytkownik jest niezalogowany'],
  ['Request failed with status code 500', 'Coś poszło nie tak, spróbuj później'],
  ['Request failed with status code 409', 'Zasób istnieje w bazie danych'],
  ['Request failed with status code 404', 'NIe znaleziono ądanego zasobu']
])

export const getErrorMessage = (error) => {
  return errorStrategy.get(error) || 'Coś poszło nie tak'
}


export const SEVERITY = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning'
}

const ERROR_CODES = {
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  DUPPLICATED: 409,
  DUPPLICATED_ERROR: 405,
  SERVER_500: 500
}

const useErrorHandler = (snackbarHandler) => {

  const { push } = useRouter()
  const pathName = usePathname()

  const handleError = (error) => {
    console.log('ERROR: ', error)

    if ((error)?.response?.status === ERROR_CODES.UNAUTHORIZED || (error)?.response?.status === ERROR_CODES.FORBIDDEN || error?.response?.status === 405) {

      snackbarHandler(getErrorMessage('Unauthorized'), SEVERITY.ERROR)
      push(`/refresh?location=${pathName}`)
      
    } else if (error?.response?.status === 400) {

      snackbarHandler(getErrorMessage(error.response.data), SEVERITY.ERROR)

    } else if(error?.response?.status === ERROR_CODES.DUPPLICATED || error?.response?.status === ERROR_CODES.NOT_FOUND) {
      
      error.response.data?.message
        ? snackbarHandler(error.response.data?.message, SEVERITY.ERROR)
        : snackbarHandler(getErrorMessage(error.response.data), SEVERITY.ERROR)

    } else if (error?.response?.status === ERROR_CODES.SERVER_500) {


      if (error.response?.data?.error?.errors) {
        const message = Object.keys(error.response.data.error.errors).map(key => {
          return error.response.data.error.errors[key].message
        })
        return snackbarHandler(message.join(', '), SEVERITY.ERROR)
      }

      snackbarHandler('Coś poszło nie tak', SEVERITY.ERROR)
    }
  }

  return {
    handleError,
  }
}

export  default  useErrorHandler
