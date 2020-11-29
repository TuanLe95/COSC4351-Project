export const required = (value) => value.trim() !== "";

export const length = config => value => {
  let isValid = true;
  if(config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  if(config.max){
    isValid = isValid && value.trim().length <= config.max;
  }
  return isValid;
}

