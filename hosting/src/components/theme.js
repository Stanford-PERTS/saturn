const themeColors = {
  // primaryLight: '#F7B8CE',
  grayLight: '#f7f8fa',
  grayMedium: '#dddddd',
  white: '#ffffff',

  primary: '#367ED4', // blue
  secondary: '#464646', // gray
  primaryLight: '#9DC5F5', // light blue
  offWhite: '#F7F8FA', // near white
};

const colors = {
  ...themeColors,
  background: themeColors.offWhite,
  disabled: themeColors.secondary,
  focus: themeColors.primaryLight,
};

const units = {
  appWidth: '820px',
  borderRadius: '3px',
  checkboxSize: '20px',
  fieldPadding: '12px',
  fontSizeBase: '1rem',
};

export default {
  colors,
  units,
};
