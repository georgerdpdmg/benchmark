const entries = performance.getEntriesByType('resource')
  .filter(item => item.initiatorType === 'script')
  .sort((a, b) => a.startTime - b.startTime);

const target = entries.findIndex(e => e.name.includes('myFile.js'));
const before = target >= 0 ? entries.slice(0, target) : entries;

const data = before.map((item, index) => ({
  name: (index + 1) + '. ' + item.name,
  start: item.startTime.toFixed(2),
  duration: item.duration.toFixed(2),
  size: item.transferSize,
  encoded: item.encodedBodySize,
  decoded: e.decodedBodySize
}));

console.table(data);

const rows = data.map(row => {
    return `
  <tr>
    <td>${row.name}</td>
    <td>${row.start} ms</td>
    <td>${row.duration} ms</td>
    <td>${row.size}</td>
    <td>${row.encoded}</td>
    <td>${row.decoded}</td>
  </tr>
`
}).join('');

const html = `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Scripts loaded before sophi script</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
        th { background: #f4f4f4; }
        tr:nth-child(even) { background: #fafafa; }
        h1 { font-size: 18px; }
        td:first-child {
         word-break: break-all;
         width: 500px;
         min-width: 400px;
        }
      </style>
    </head>
    <body>
      <h1>Scripts loaded before sophi script</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>Duration</th>
            <th>Size</th>
            <th>Encoded</th>
            <th>Decoded</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
  </html>
`;

const blob = new Blob([html], { type: 'text/html' });
const anchor = document.createElement('a');
anchor.href = URL.createObjectURL(blob);
anchor.download = 'scripts-loaded-before-sophi-article-id-.html';
anchor.click();