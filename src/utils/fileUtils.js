import fs from 'fs/promises';

export const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file from path ${filePath}:`, error);
        throw error;
    }
};

export const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing file to path ${filePath}:`, error);
        throw error;
    }
};
