export const PORT = process.env.PORT ?? 3000;

export const MIMETYPE = 
{
    NONE: "none",
    OTHER: "other",
    DOC: "doc",
    DOCX: "docx",
    RTF: "rtf"
}

export const PRICE_RATES = 
{
    "ru":{oneSignPrice:0.05, minPrice:50},
    "ua":{oneSignPrice:0.05, minPrice:50},
    "en":{oneSignPrice:0.12, minPrice:120},
}

export const TIME_RATES =
{
    "ru":1333,
    "ua":1333,
    "en":333,
}