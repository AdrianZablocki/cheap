export const getRegionList = () => {
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
}

export const getStrainList = () => {
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
  