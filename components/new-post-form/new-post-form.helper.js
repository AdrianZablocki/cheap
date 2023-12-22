import { getRegionList, getStrainList } from '@/utils'

export const selectsConfig = (actions) => {
  return [
    { 
      id: 'strainName',
      label: 'Nazwa suszu:',
      value: actions.strainName,
      placeholder: 'Wybierz nazwę suszu',
      options: getStrainList(),
      action: actions.setStrainName
    },
    { 
      id: 'region',
      label: 'Województwo:',
      value: actions.region,
      placeholder: 'Wybierz województwo',
      options: getRegionList(),
      action: actions.setRegion
    }
  ]
}

export const inputsConfig = (actions) => {
  return [
    {
      id: 'city',
      type: 'text',
      value: actions.city,
      label: 'Miasto:',
      placeholder: 'Podaj miasto',
      min: 0,
      onChange: actions.setCity
    },
    {
      id: 'price',
      type: 'number',
      value: actions.price,
      label: 'Cena opakowania:',
      placeholder: 'Podaj cenę opakowania',
      min: 0,
      onChange: actions.setPrice
    },
    {
      id: 'amount',
      type: 'number',
      value: actions.amount,
      label: 'Waga opakowania:',
      placeholder: 'Podaj wagę opakowania',
      min: 0,
      onChange: actions.setAmount
    }
  ] 
}
