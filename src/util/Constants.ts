export const CommandErrors = {
    USER_HAVE_HIGHER_ROLES: 'Высшая роль данного пользователя либо на одном уровне с Вашей, либо выше неё.',
    NOT_ENOUGH_PERMISSION: 'У Вас недостаточно прав на использование этой команды.',
    USER_INVALID: 'Указан неверный пользователь, либо пользователь недостижим.',
    USER_ALREADY_MUTED: 'Пользователь уже находится в муте.',
    USER_NOT_MUTED: 'Пользователь не находится в муте.',
    USER_HAVE_NO_WARNS: 'У пользователя нет предупреждений.',
    USER_ALREADY_MARRIAGE_INVITED: 'Этому пользователю уже отправили приглашение. Пожалуйста, подождите...',
    ROLE_INVALID: 'Указан неверный id роли.',
    MARRIAGE_ALREADY_CREATED: 'Либо Вы находитесь в браке, либо выбранный Вами пользователь.',
    MARRIAGE_REQUIRED: 'Для выполнения этой команды Вы (или пользователь, которого вы указали) должны находиться в браке.',
    SEND_MESSAGE_FAILED: 'Не удалось отправить сообщение, попробуйте ещё раз.',
    OPTIONS_REQUIRED: 'Вы не указали параметры команды.',
    USER_ALREADY_BANNED: 'Этот пользователь уже забанен.',
    USER_NOT_BANNED: 'Этот пользователь и так не находится в бане.',
    COINFLIP_ALREADY_CREATED: 'Дуэль уже запущена. Пожалуйста, подождите или примите дуэль другого пользователя.',
    INVITE_INVALID: 'Такого приглашения не существует.',
    TICKET_ALREADY_CREATED: 'Вы уже отправили тикет. Дождитесь закрытия предыдущего, чтобы отправить новый тикет.',
    USER_ALREADY_HAVE_ROOM: 'У пользователя уже есть комната.',
    CHANNEL_INVALID: 'Указан неверный id канала.',
    ROOM_ALREADY_LINKED: 'Эта комната уже зарегистрирована.',
    USER_BLOCKED_BOT: 'Этот пользователь заблокировал меня или закрыл свои личные сообщения. Попроси его открыть их, пожалуйста!',
    YOU_ALREADY_HAVE_ROLE: 'Вы уже получили эту роль!',
    COOLDOWN: 'Вы слишком часто вызываете эту команду!'
};

export const BotMessages = {
    MUTE_EXPIRED_USER: 'С Вас был снят мут, Вы снова можете общаться в чате.',
    MUTE_ADDED_USER: 'Вам был выдан мут на %d по причине: **"%r"**.',
    MUTE_REMOVED_AUDIT_LOG: 'Модератор %d снял мут.',
    MUTE_ADDED_AUDIT_LOG: 'Модератор %d выдал мут по причине: %r.',
    WARN_ADDED_USER: 'Вы получили предупреждение по причине: **"%r"** **#%d**).',
    WARN_AUTO_REMOVED_USER: 'С вас было снято предупреждение, выданное %t',
    BAN_ADDED_USER: 'Вы были забанены на сервере JolyMine по причине: **"%r"**.',
    ROLE_BAN_ADDED_USER: 'Вы получили 3 предупреждения и были замучены на сервере JolyMine.',
    SUCCESS: 'Успешно!',
    PAGINATOR_ACCESS_ERROR: 'Вы не можете изменять это сообщение с реакциями.',
    MARRIAGE_USER_LEAVE_DESTROYED: 'Ваш брак с %u был расторгнут из-за того, что Ваш партнер вышел с сервера.',
    MARRIAGE_DIVORCE_DESTROYED: 'Ваш брак с %u был расторгнут по желанию Вашего партнера.',
    MARRIAGE_BALANCE_LOW: 'Ваш брак на грани расторжения! Пополните баланс, чтобы сохранить Ваш брак.',
    CASH_COMMAND: 'Команда /cash.',
    MARRIAGE_BUY: 'Покупка брака.',
    USER_TRANSACTION: 'Перевод валюты между пользователями',
    TIMELY_BONUS: '12-часовая награда.',
    DUEL: 'Дуэль между пользователями.',
    COINFLIP_USER_WON: 'Вы победили!',
    COINFLIP_USER_LOST: 'Вы проиграли :(',
    COINFLIP_USER_DISPOSED: 'С Вами никто не захотел сражаться...',
    INVITE_EDITED: 'Описание у приглашения с кодом **%c** было изменено на: **"%d"**.',
    INVITES_ARE_CREATING: 'Приглашения формируются. Пожалуйста, подождите...',
    INVITE_DEFAULT_DESCRIPTION: 'Описание не указано.',
    VANITY_DESCRIPTION: 'Прямая ссылка на сервер.',
    TICKET_SENT: 'Тикет отправлен.',
    ANSWER_TICKET: 'Пожалуйста, ответьте на вопрос тикета. У Вас есть ровно 5 минут.',
    TICKET_ALREADY_CLOSED: 'Этот тикет уже был закрыт из-за инактива.',
    PRIVATE_EDIT_NAME: '%u, укажите новое название для привата, у Вас есть 20 секунд.',
    PRIVATE_NAME_EDITED: '%u, Вы успешно изменили название своей комнаты на **%n**',
    PRIVATE_BUTTON_DISPOSED: 'Вы не успели настроить свою комнату... Попробуйте еще раз.',
    PRIVATE_EDIT_SLOTS: '%u, введите нужное количество слотов от 0 до 99 (0 - без ограничений на слоты).',
    PRIVATE_SLOTS_EDITED: '%u, Вы установили лимит пользователей в **%d**',
    PRIVATE_ALREADY_LOCKED: '%u, канал уже закрыт от всех пользователей.',
    PRIVATE_LOCKED: '%u, Вы закрыли канал от всех пользователей.',
    PRIVATE_ALREADY_UNLOCKED: '%u, канал уже открыт для всех пользователей.',
    PRIVATE_UNLOCKED: '%u, Вы открыли канал для всех пользователей.',
    PRIVATE_KICK_USER: '%u, укажите пользователя, которого хотите кикнуть.',
    PRIVATE_USER_KICKED: '%u, Вы успешно выгнали этого пользователя из Вашей комнаты.',
    PRIVATE_GIVE_PERM: '%u, укажите пользователя, которому хотите выдать права.',
    PRIVATE_PERM_ALREADY_GIVEN: '%u, этот пользователь уже имеет доступ в Вашу комнату.',
    PRIVATE_PERM_GIVEN: '%u, Вы выдали доступ в комнату этому пользователю.',
    PRIVATE_RESTRICT_PERM: '%u, укажите пользователя, у которого Вы хотите забрать права.',
    PRIVATE_PERM_ALREADY_RESTRICTED: '%u, этот пользователь и так не имеет доступ в Вашу комнату.',
    PRIVATE_PERM_RESTRICTED: '%u, Вы забрали доступ в комнату у этого пользователя.',
    PRIVATE_GIVE_VOICE: '%u, укажите пользователя, которому хотите выдать право говорить в Вашем канале.',
    PRIVATE_VOICE_ALREADY_GIVEN: '%u, этот пользователь уже может говорить в Вашем канале.',
    PRIVATE_VOICE_GIVEN: '%u, Вы выдали возможность говорить этому пользователю в Вашем канале.',
    PRIVATE_RESTRICT_VOICE: '%u, укажите пользователя, у которого хотите забрать право говорить в Вашем канале.',
    PRIVATE_VOICE_ALREADY_RESTRICTED: '%u, этот пользователь и так не может говорить в Вашем канале.',
    PRIVATE_VOICE_RESTRICTED: '%u, Вы запретили этому пользователю говорить в Вашем канале.',
    PRIVATE_SET_OWNER: '%u, укажите пользователя, которому Вы хотите передать права в Вашем канале.',
    PRIVATE_OWNER_SET: '%u, Вы успешно передали права к Вашему каналу.',
    USER_LEFT_SERVER: 'Пользователь покинул сервер.',
    TICKET_CLOSED_AFK: 'Тикет был закрыт из-за неактивности.',
    TICKET_CLOSED_THREAD_LEAVE: 'Ветка была покинута, тикет закрыт.',
    NO_ONE_ANSWERED_TICKET: 'Никто так и не ответил на тикет...',
    GENDER_SET: 'Пользователю %u был назначен гендер %g',
    GENDER_KILLED: 'Ай-яй-яй-яй-яй, Вы убили гендер, убили гендер пользователю %u',
    STAFF_ROLE_ADDED: 'Вам была выдана роль для оповещения о наборе в стафф!',
    STAFF_ROLE_REMOVED: 'Вы убрали себе роль для оповещения о наборе в стафф.',
    PLANET_BOUGHT: 'Покупка планетки.',
    CHECK_PM: 'Проверьте личные сообщения.'
};