import { DE_DE, EN_US, ES_AR, PT_BR } from './enums/languages';

const PROJECT_ID = 'cm2ciweoq0002zxv8gf7lqhic';
let translations = ES_US;
let language = ES_AR;

export async function getTranslations(lang = language, callback) {
  localStorage.clear();
  language = lang;
  
  if (language === ES_AR) {
    console.log(`FETCH TRANSLATIONS --- key = traduccion`);
    return;
  }
  
  return await fetch(`https://traducila.vercel.app/api/translations/${PROJECT_ID}/${language}`)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('translations', JSON.stringify(data));
      translations = data;
      if (callback) callback();
    });
}

export function getPhrase(key) {
  if (!translations) {
    const locals = localStorage.getItem('translations');
    translations = locals ? JSON.parse(locals) : null;
  }
  
  let phrase = key;
  if (translations && translations[key]) {
    phrase = translations[key];
  }
  
  return phrase;
}
