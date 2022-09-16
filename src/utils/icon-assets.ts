const joinPaths = (left: string, right: string): string => {
  return [left.replace(/\/+$/, ''), right.replace(/^\/+/, '')].join('/');
};

export const iconImageURL = (
  icon_name: string | undefined,
  size: 'big' | 'small'
): string => {
  let icon_path = `assets/svg/icons/${size}_icons/DefaultTechn.svg`;

  if (icon_name) {
    icon_name = icon_name.replace('#', 'Sharp');
    icon_path = `assets/svg/icons/${size}_icons/${icon_name}.svg`;
  }

  return joinPaths(import.meta.env.BASE_URL, icon_path);
};
