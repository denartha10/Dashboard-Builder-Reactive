type standardTypes = 
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

interface standardFieldType {
    buildType: 'standard';
    type: standardTypes;
    name: string;
    constraints: Record<string, string>;
}

export {
    standardFieldType
}