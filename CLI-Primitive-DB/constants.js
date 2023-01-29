export const questions =
[
    {
        type:'input',
        name:'Name',
        message:'What is your name? Press `ESC` to exit',
        validate:(answer) => {
            if(answer == ''){
                return 'Please enter a valid name';
            }
            return true;
        }
    },
    {
        type:'list',
        name:'Gender',
        message:'Chose your Gender. Press `ESC` to exit',
        choices:['male','female','other'],
        default:'other'
    },
    {
        type:'input',
        name:'Age',
        message:'What is your age? Press `ESC` to exit',
        validate:(answer) => {
            if(answer == ''){
                return 'Please enter a valid age';
            }
            if(isNaN(parseInt(answer))){
                return 'Please enter a valid age';
            }
            return true;
        }
    },
    {
        type:'confirm',
        name:'GetValuesFromDb',
        message:'Would you search values in DB. Press `ESC` to exit',
    }
];

export const dbActionQuestions =
[
    {
        type:'input',
        name:'Name',
        message:'Enter  name you want to find in DB? Press ESC to exit',
        validate:(answer) => {
            if(answer == ''){
                return 'Please enter a valid name';
            }
            return true;
        }
    },
];