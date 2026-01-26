//Name: Gustavo Miranda
//Student ID:  101488574

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const INPUT_FILE = path.join(__dirname, 'input_countries.csv');
const CANADA_FILE = path.join(__dirname, 'canada.txt');
const USA_FILE = path.join(__dirname, 'usa.txt');

const TARGETS = {
  canada: CANADA_FILE,
  'united states': USA_FILE,
};

const formatRow = (row) => `${row.country},${row.year},${row.population}\n`;

const ensureFreshFile = (filePath) => fs.rmSync(filePath, { force: true });

function bootstrapWriters() {
  const writers = new Map();
  Object.entries(TARGETS).forEach(([, filePath]) => {
    ensureFreshFile(filePath);
    const stream = fs.createWriteStream(filePath, { flags: 'a' });
    stream.write('country,year,population\n');
    writers.set(filePath, stream);
  });
  return writers;
}

function filterCountries() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Input file not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  const writers = bootstrapWriters();
  const tallies = { canada: 0, 'united states': 0 };

  fs.createReadStream(INPUT_FILE)
    .pipe(csv())
    .on('data', (row) => {
      const key = (row.country || '').trim().toLowerCase();
      const targetFile = TARGETS[key];
      if (targetFile) {
        writers.get(targetFile).write(formatRow(row));
        tallies[key] += 1;
      }
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err.message);
    })
    .on('end', () => {
      writers.forEach((stream) => stream.end());
      console.log('Filtering complete. Files generated:');
      console.log(`- ${CANADA_FILE} (${tallies.canada} lines of data)`);
      console.log(`- ${USA_FILE} (${tallies['united states']} lines of data)`);
    });
}

filterCountries();
