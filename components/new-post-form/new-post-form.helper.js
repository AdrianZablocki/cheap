export const newPostFormHelper = {

  getRegionList: () => {
    return [
      'Dolnośląskie',
      'Kujawsko-pomorskie',
      'Lubelskie',
      'Lubuskie',
      'Łódzkie',
      'Małopolskie',
      'Mazowieckie',
      'Opolskie',
      'Podkarpackie',
      'Podlaskie',
      'Pomorskie',
      'Śląskie',
      'Świętokrzyskie',
      'Warmińsko-mazurskie',
      'Wielkopolskie',
      'Zachodniopomorskie'
    ].map(reg => ({
      value: reg
    }))
  },

  getStrainList: () => {
    return [
      'Red no 2',
      'Aurora 22',
      'Aurora 20',
      'S-lab Jack Herrer',
      'Gorila Glue 420 Pharmacy'
    ].map(strain => ({
      value: strain
    }))
  }
  
}

export const selectsConfig = (actions) => {
  return [
    { 
      id: 'strainName',
      label: 'Nazwa suszu:',
      placeholder: 'Wybierz nazwę suszu',
      options: newPostFormHelper.getStrainList(),
      action: actions.strainName
    },
    { 
      id: 'region',
      label: 'Województwo:',
      placeholder: 'Wybierz województwo',
      options: newPostFormHelper.getRegionList(),
      action: actions.region
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
