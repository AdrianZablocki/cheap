import { getRegionList, getStrainList } from '@/utils'

export const selectsConfig = () => {
  return [
    { 
      id: 'strainName',
      label: 'Nazwa suszu:',
      placeholder: 'Wybierz nazwę suszu',
      options: getStrainList()
    },
    { 
      id: 'region',
      label: 'Województwo:',
      placeholder: 'Wybierz województwo',
      options: getRegionList()
    }
  ]
}

export const inputsConfig = () => {
  return [
    {
      id: 'city',
      type: 'text',
      label: 'Miasto:',
      placeholder: 'Podaj miasto',
      min: 0
    },
    {
      id: 'price',
      type: 'number',
      label: 'Cena opakowania:',
      placeholder: 'Podaj cenę opakowania',
      min: 0
    },
    {
      id: 'amount',
      type: 'number',
      label: 'Waga opakowania:',
      placeholder: 'Podaj wagę opakowania',
      min: 0
    }
  ] 
}
