
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
// const { faker } = require('@faker-js/faker');

interface Employee {
    id: string;
    name: string;
    department: string;
    avatarUrl: string;
}

const DEPARTMENTS = ['Engineering', 'Sales', 'HR', 'Marketing', 'Operations'];
const EMPLOYEE_COUNT = 500;

export const generateEmployees = (count: number): Employee[] => {
    const employees: Employee[] = [];

    for (let i = 1; i <= count; i++) {
        const id = `EMP-${i.toString().padStart(3, '0')}`;
        const sex = faker.person.sexType();
        const firstName = faker.person.firstName(sex);
        const lastName = faker.person.lastName();
        const name = `${firstName} ${lastName}`;
        const department = faker.helpers.arrayElement(DEPARTMENTS);
        const avatarUrl = faker.image.avatar();

        employees.push({
            id,
            name,
            department,
            avatarUrl,
        });
    }
    return employees;
};

const run = () => {
    const employees = generateEmployees(EMPLOYEE_COUNT);

    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'roster.json');
    fs.writeFileSync(outputPath, JSON.stringify(employees, null, 2));

    console.log(`Successfully generated ${employees.length} employees to ${outputPath}`);
};

if (require.main === module) {
    run();
}
