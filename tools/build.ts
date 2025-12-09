import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function build() {
    try {
        console.log('Building the Angular project...');
        await execPromise('ng build --prod');
        console.log('Build completed successfully.');
    } catch (error) {
        console.error('Error during build:', error);
    }
}

build();