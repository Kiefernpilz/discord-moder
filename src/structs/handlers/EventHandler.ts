import { Client } from '../client/Client';
import { Event } from '../../../typings';
import { readdirSync } from 'fs';
import { join } from 'path';


export class EventHandler {

    constructor(client: Client) {
        const eventsPath = join(__dirname, '..', '..', 'events');
        const events = readdirSync(eventsPath);

        for(const eventName of events) {
            void import(`${eventsPath}/${eventName}`).then((file: { default: typeof Event }) => {
                const event = new file.default();
                client.on(event.name, event.exec);
            });
        }
    }

}