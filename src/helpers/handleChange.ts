export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  fields: string[],
  setDisabled: (value: boolean) => void,
  onChange: (e: string) => void
) => {
  onChange(e.target.value);
  if (fields.some((field) => [null, 'null', ''].indexOf(field) !== -1)) {
    setDisabled(true);
    return;
  }
  if (e.target.value !== null && e.target.value !== 'null') setDisabled(false);
  if (e.target.value === '') setDisabled(true);
};
