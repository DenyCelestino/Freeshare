export const COLORS = {
  primary: '#2AABEE',
  white: '#FFF',
  black: '#000',
  secondary: '#B4B6B9'
}

export const LIGHT = {
  background: '#F7F9FA',
  primarycolor: '#000',
  secondarycolor: '#595766'
}
export const DARK = {
  background: '#18171E',
  primarycolor: '#FFF',
  secondarycolor: '#595766'
}

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24
}

export const FONTS = {
  bold: 'InterBold',
  semiBold: 'InterSemiBold',
  medium: 'InterMedium',
  regular: 'InterRegular',
  light: 'InterLight',
  PoppinsBold: 'PoppinsBold',
  PoppinsRegular: 'PoppinsRegular',
  PoppinsSemiBold: 'PoppinsSemiBold',
  Labster: 'Labster'
}

export const SHADOWS = {
  light: {
    shadowColor: LIGHT.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  medium: {
    shadowColor: LIGHT.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7
  },
  dark: {
    shadowColor: LIGHT.black,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14
  }
}
