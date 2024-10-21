/*import { DE_DE, EN_US, ES_AR, PT_BR } from '../enums/languages'; // Asegurarse de la ruta correcta
const PROJECT_ID = 'cm2ciweoq0002zxv8gf7lqhic';
let translations = null;
let language = ES_AR;

export async function getTranslations(lang = language, callback) {
  localStorage.clear();
  language = lang;
  
  if (language === ES_AR) {
    console.log(`FETCH TRANSLATIONS --- key = traduccion`);
    return;
  }
  
  return await fetch(`https://traducila.vercel.app/api/translations/cm2ciweoq0002zxv8gf7lqhic/en-US`)
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
}*/


// src/services/translations.js

const translations = {
  ES_AR: {
    Click_para_empezar: "Click para Empezar",  // Mantén la misma clave en todos los idiomas
    Puntos: "Puntos",
    Perdiste: "Perdiste",
    Reintentar: "Reintentar",
    // Añade más traducciones aquí
  },
  EN_US: {
    Click_para_empezar: "Click to Start",  // Usa la misma clave en todos los idiomas
    Puntos: "Points",
    Perdiste: "You lose",
    Reintentar: "Restart",
    // Añade más traducciones aquí
  },
};

export function getPhrase(phraseKey, language) {
  if (translations[language] && translations[language][phraseKey]) {
    return translations[language][phraseKey];
  }
  return phraseKey;  // Si no encuentra la clave, devuelve la clave original
}

