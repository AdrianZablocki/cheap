export const getFormikError = (formik, controlName) => {
  return formik.touched[controlName] && formik.errors[controlName]
    ? formik.errors[controlName] : null
}
