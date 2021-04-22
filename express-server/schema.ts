// Application's schemas
export const registry = {
    name: String,
    surname: String,
    birthday: Date,
    email: String
};
export const appointments = {
    date: Date,
    site: String,
    registryId: Number,
    operationId: Number
};
export const operations = {
    desc: String,
    code: String,
    price: Number,
    duration: Number
};
