export default function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/gi, $1 =>
    $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );
}
