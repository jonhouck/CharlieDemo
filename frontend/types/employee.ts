export interface Employee {
    id: string;
    name: string;
    department: string;
    avatarUrl: string;
}

export interface SwipeEvent {
    type: 'SWIPE_IN' | 'SWIPE_OUT';
    employeeId: string;
    timestamp: string;
}
