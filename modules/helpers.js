import process from 'node:process';

export const write = str => process.stdout.write(str);

export const read = cb => {
  process.stdin.addListener('data', chunk => {
    // Поскольку chunk приходит в виде буфера, переводим его в строку
    cb(chunk.toString('utf-8'));
  });
};

// '\x1Bc' - очистка терминала
export const clear = () => write('\x1Bc');

// Функция для указания позиции курсора
export const position = (row, col) => write(`\x1b[${row};${col}H`);

// Функция для отрисовки прямоугольника
export const box = (row, col, height, width) => {
  const border = ['┌', '─', '┐', '│', '└', '┘'];
  const h = height - 2;
  const w = width - 2;

  position(row, col);
  write(border[0] + border[1].repeat(w) + border[2]);

  for (let i = 1; i < h; i++) {
    position(row + i, col);
    write(border[3] + ' '.repeat(w) + border[3]);
  }

  position(row + h, col);
  write(border[4] + border[1].repeat(w) + border[5]);
};
