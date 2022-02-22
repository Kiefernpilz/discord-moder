import {Message, MessageOptions, Snowflake} from 'discord.js';
import {APIMessage} from "discord-api-types";
export const unresolvedConfirm: { resolve: (value: boolean) => void; id: number; userId: Snowflake }[] = [];

export async function confirm(
  content: string | MessageOptions,
  edit: (content: (string | MessageOptions) & { fetchReply: true }) => Promise<Message | APIMessage>,
  userId: Snowflake,
  timer: number = 20000,
  deleteMsg: boolean = true,
): Promise<boolean> {
  const id = Math.floor(Math.random() * 100000);

  const msgContent = typeof content === 'string' ? { content } : content;
  const message = await edit({
    ...msgContent,
    ...getButtons(id),
    fetchReply: true
  })

  return new Promise<boolean>(resolve => {
    unresolvedConfirm.push({ resolve: (value: boolean) => {
        resolve(value);
        deleteMsg && message && (message as Message).delete();
        deleteById(id);
      }, id, userId });
    setTimeout(() => {
      resolve(false);
      if ((message as Message).deletable) {
        deleteMsg && (message as Message).delete();
      }
      deleteById(id);
    }, timer);
  });
}

function getButtons(id: number): MessageOptions {
  return {
    components: [
      {
        type: 'ACTION_ROW',
        components: [
          {
            type: 'BUTTON',
            emoji: '✅',
            style: 'SECONDARY',
            customId: `select_confirm_${id}_true`,
          },
          {
            type: 'BUTTON',
            emoji: '❎',
            style: 'SECONDARY',
            customId: `select_confirm_${id}_false`,
          },
        ],
      },
    ],
  };
}

function deleteById(id: number) {
  const index = unresolvedConfirm.findIndex(s => s.id === id);
  if (index !== -1)
    unresolvedConfirm.splice(unresolvedConfirm.findIndex(s => s.id === id), 1);
}