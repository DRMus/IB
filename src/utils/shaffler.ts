export function shaffler(text: string, key: string) {
  if (key.length < text.length) {
    return false
  }

  let newKey = Number.parseInt(key, 2).toString();

  let output = "";
  for (let i = 0; i < text.length; i++) {
    let inp = text.charCodeAt(i);
    let k = newKey.charCodeAt(i);
    output += String.fromCharCode(inp ^ k);
  }

  return output;
}
