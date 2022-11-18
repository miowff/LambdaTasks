import { KeyboardButton} from 'node-telegram-bot-api'
class Buttons
{
    AVELIABLE_CURRENCIES:KeyboardButton = {text:'Доступные криптовалюты'};
    FAVORITES:KeyboardButton={text:'Избранное'};
}
const BUTTONS = new Buttons();
export default BUTTONS;