declare namespace login {
    export interface ProcessEnv {
        DB_HOST:string;
        DB_USER:string;
        DB_PASSWORD ?:string;
        DB_NAME:string;
        SECRETE:string;
        MAIL_USERNAME:string;
        MONGO_URL:string;
        COLLECTION_NAME:string;
    }
}