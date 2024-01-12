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
    'Aurora 20, LA Confidential',
    'Aurora 20, Pink Kush',
    'Aurora 22, Ghost Train Haze',
    'Aurora 22, Delahaze',
    'Aurora 8, Equiposa',
    'Canopy Growth 20, Bakerstreet',
    'Canopy Growth 8/7, Penelope',
    'Canpoland 17, Shiskaberry',
    'Canpoland 22, Gorilla Glue',
    'Four 20 Pharma 22, Gorilla Glue',
    'Red No 2, Lemon Skunk',
    'S-LAB 18, Black Tuna',
    'S-LAB 18, Girl Scout Cookies',
    'S-LAB 18, Headband',
    'S-LAB 18, Jack Herer',
    'S-LAB 18, Jean guy',
    'S-LAB 18, Mango',
    'S-LAB 18, Master Kush',
    'S-LAB 18, Pink Kush',
    'S-LAB 18, Rockstar',
    'S-LAB 18, Sour Diesel',
    'S-LAB 18, White Widow',
    'S-LAB 22, Island Sweet Skunk',
    'S-LAB 22, Headband',
    'S-LAB 22, Master Kush',
    'S-LAB 22, Headband',
    'Tilray 18, Blueberry',
    'Tilray 18, Jack Herrer'
  ].map(strain => ({
    value: strain
  }))
}
  