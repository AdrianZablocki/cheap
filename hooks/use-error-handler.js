export const errorStrategy = new Map([
  ['Unauthorized', 'Uytkownik jest niezalogowany'],
  ['Request failed with status code 500', 'fak jutu']
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
  SERVER_500: 500
}


const useErrorHandler = (snackbarHandler) => {

  const handleError = (error) => {
    console.log('ERROR: ', error)

    if ((error).response.status === ERROR_CODES.UNAUTHORIZED) {

      // TODO handle with 401 error
      console.log('handle 401 error')

      snackbarHandler(getErrorMessage('Unauthorized'), SEVERITY.ERROR)

    } else if (error.response.status === 400) {

      snackbarHandler(getErrorMessage(error.response.data), SEVERITY.ERROR)
    } else if (error.response.status === ERROR_CODES.SERVER_500) {
      console.log(Object.keys(error.response.data.error.errors))
      const message = Object.keys(error.response.data.error.errors).map(key => {
        return error.response.data.error.errors[key].message
      })
      snackbarHandler(message.join(', '), SEVERITY.ERROR)
    }
  }

  return {
    handleError,
  }
}

export  default  useErrorHandler
