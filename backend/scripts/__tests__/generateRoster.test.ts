
import { generateEmployees } from '../generateRoster';

describe('generateRoster', () => {
    it('should generate the correct number of employees', () => {
        const count = 10;
        const employees = generateEmployees(count);
        expect(employees).toHaveLength(count);
    });

    it('should generate employees with correct schema', () => {
        const employees = generateEmployees(1);
        const employee = employees[0];

        expect(employee).toHaveProperty('id');
        expect(employee).toHaveProperty('name');
        expect(employee).toHaveProperty('department');
        expect(employee).toHaveProperty('avatarUrl');

        expect(typeof employee.id).toBe('string');
        expect(typeof employee.name).toBe('string');
        expect(typeof employee.department).toBe('string');
        expect(typeof employee.avatarUrl).toBe('string');
    });

    it('should generate unique IDs', () => {
        const count = 500;
        const employees = generateEmployees(count);
        const ids = employees.map(e => e.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(count);
    });

    it('should use correct ID format', () => {
        const employees = generateEmployees(1);
        expect(employees[0].id).toMatch(/^EMP-\d{3}$/);
    });
});
