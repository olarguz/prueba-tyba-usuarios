import { cleanEnv, str, port, url } from 'envalid';

function validate(parameters: any) {
    let validator = {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_DB: str(),
        MONGO_PATH: str(),
        MONGO_PARAMS: str(),
        SERVER_HOST: url(),
        API_KEY: str(),
        PORT: port()
    };
    cleanEnv(parameters, validator);
}

export { validate };
