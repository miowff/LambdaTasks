import { KeyboardButton} from 'node-telegram-bot-api'
class Buttons
{
    AVELIABLE_CURRENCIES:KeyboardButton = {text:'Доступные криптовалюты'};
    FAVORITES:KeyboardButton={text:'Избранное'};
    HELP:KeyboardButton={text:'Помощь'};
}
const BUTTONS = new Buttons();
export default BUTTONS;