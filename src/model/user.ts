interface User {
    username: String,
    name: String,
    pass: String,
    token: String,
    logged: Boolean,
    active: Boolean,
    timestamps: true
};

export default User;
