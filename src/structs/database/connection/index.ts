import { Connection, createConnection } from 'typeorm';

export let connection: Connection;

export function connectionInit(): Promise<Connection> {
    return createConnection()
        .then(con => {
            console.log('database ready');
            connection = con;
            return con;
        });
}