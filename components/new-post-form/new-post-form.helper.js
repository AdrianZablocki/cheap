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

export const selectsConfig = [
  { 
    id: 'strainName',
    label: 'Nazwa suszu:',
    placeholder: 'Wybierz nazwę suszu',
    options: newPostFormHelper.getStrainList()
  },
  { 
    id: 'region',
    label: 'Województwo:',
    placeholder: 'Wybierz województwo',
    options: newPostFormHelper.getRegionList()
  }
]

export const inputsConfig = [
  {
    type: 'number',
    value: '',
    label: 'Cena opakowania:',
    placeholder: 'Podaj cenę opakowania',
    min: 0,
    onChange: (e) => console.log(e.target.value)
  },
  {
    type: 'number',
    value: '',
    label: 'Waga opakowania:',
    placeholder: 'Podaj wagę opakowania',
    min: 0,
    onChange: (e) => console.log(e.target.value)
  }
]
