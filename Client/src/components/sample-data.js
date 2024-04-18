
export const possibleTerms = {
    terms: [
        { id: 'term1', name: 'Spring 2024' },
        { id: 'term2', name: 'Fall 2024' },
        { id: 'term3', name: 'Spring 2025' },
    ],
};

export const sampleLogins = {
    logins: [
        { id: '1year', blazerID: '1year', password: '1year' },
        { id: '2year', blazerID: '2year', password: '2year' },
        { id: 'admin', blazerID: 'admin', password: 'admin' },
        { id: 'test', blazerID: 'wasd', password: 'wasd' },
    ],
    users: [
        { id: '1year', role: 'student', name: 'First Year Student', advisor: 'admin', year: 1 },
        { id: '2year', role: 'student', name: 'Second Year Student', advisor: 'admin', year: 1 },
        { id: 'test', role: 'student', name: 'Test Student', advisor: 'admin', year: 1 },
        { id: 'admin', role: 'instructor', name: 'Dr. Admin', advisor: '', year: 0 },
    ],
};