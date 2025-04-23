// import i18next from 'i18next';

// import * as en from '../locales/en/translations.json';
// import * as th from '../locales/th/translations.json';

// i18next.init({
//     fallBackLng: 'en',
//     fallBackNs: 'common',
//     resources: {
//         en: {
//             translation: {
//                 key: 'asd',
//                 en
//             }
//         },
//         th: {
//             translation: {
//                 key: 'ฟหก',
//                 th
//             }
//         },
//     }
// })

// const ret = i18next.t('key', {lng:'en'})

// console.log('from i18',ret)


// export default i18next;


import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallBackLng: 'en',
        resources: {
            en: {
                translation: {
                    learn: 'Learn React',
                    sidebar: {
                        Dashboard: 'Dashboard',
                        Upload: 'Upload',
                        History: 'History',
                        NightMode: 'Night mode',
                        Setting: 'Setting',
                        changeLanguage: 'Change language'
                    }
                }
            }
        }
    })