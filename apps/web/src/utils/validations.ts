export const notEmptyString = {
  validation: (value: string) => value.trim() !== '',
  message: 'Este campo es requerido'
}
