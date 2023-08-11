export function cleanOutputFromPowershell(output: string) {
  const lines = output.split("\n");
  for (const line in lines) {
    const newLine = lines[line].replace(/\s+/g, " ").trim();
    lines[line] = newLine;
  }
  return lines.join("\n");
}
