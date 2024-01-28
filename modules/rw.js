import fs from 'node:fs/promises';

export const read = async path => {
  try {
    const result = await fs.readFile(path, 'utf-8');
    return result;
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
};

export const write = async (path, dataToWrite) => {
  try {
    await fs.writeFile(path, dataToWrite);
    return true;
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
};
