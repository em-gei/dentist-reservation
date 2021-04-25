// Application's schemas
export const registry = {
    name: String,
    surname: String,
    fiscalCode: String,
    birthday: Date,
    email: String
};
export const appointments = {
    date: Date,
    fiscalCode: String,
    interval: String
};

export const timetables = {
    position: Number,
    interval: String
};
