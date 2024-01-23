export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titlize(str: string): string {
  return str.split(' ').map(capitalize).join(' ');
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/ /g, '-');
}

export function unslugify(str: string): string {
  return str.toLowerCase().replace(/-/g, ' ');
}
