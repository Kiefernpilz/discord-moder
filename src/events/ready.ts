import { Event } from '../../typings';
import { client } from '../index';
import { modCron } from '../util/cron';

export default class implements Event {
    name: 'ready' = 'ready'
    async exec(): Promise<void> {
        console.log('ready');

        await client.registerCommands();
        modCron.start();
    }
}
