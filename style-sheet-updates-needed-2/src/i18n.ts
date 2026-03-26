import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "challenge": "Challenge",
        "story": "Story",
        "product": "Product",
        "impact": "Impact",
        "experience": "Experience",
        "get_involved": "Get Involved"
      },
      "hero": {
        "eyebrow": "Mozambique · Conservation · Community",
        "title_part1": "Taste the",
        "title_gold": "Wild.",
        "title_outline": "Fund",
        "title_part2": "the Future.",
        "subtitle": "A biodiversity-linked honey enterprise born from the wildlands of Maputo National Park — harvested by community, protected by nature.",
        "discover": "Discover the Honey",
        "see_impact": "See the Impact"
      },
      "stats": {
        "hives": "Active Hives",
        "families": "Families",
        "potential": "Potential"
      }
    }
  },
  pt: {
    translation: {
      "nav": {
        "challenge": "Desafio",
        "story": "História",
        "product": "Produto",
        "impact": "Impacto",
        "experience": "Experiência",
        "get_involved": "Envolver-se"
      },
      "hero": {
        "eyebrow": "Moçambique · Conservação · Comunidade",
        "title_part1": "Prove o",
        "title_gold": "Selvagem.",
        "title_outline": "Financie",
        "title_part2": "o Futuro.",
        "subtitle": "Uma empresa de mel ligada à biodiversidade, nascida nas terras selvagens do Parque Nacional de Maputo — colhido pela comunidade, protegido pela natureza.",
        "discover": "Descobrir o Mel",
        "see_impact": "Ver o Impacto"
      },
      "stats": {
        "hives": "Colmeias Ativas",
        "families": "Famílias",
        "potential": "Potencial"
      }
    }
  },
  it: {
    translation: {
      "nav": {
        "challenge": "Sfida",
        "story": "Storia",
        "product": "Prodotto",
        "impact": "Impatto",
        "experience": "Esperienza",
        "get_involved": "Partecipa"
      },
      "hero": {
        "eyebrow": "Mozambico · Conservazione · Comunità",
        "title_part1": "Assapora il",
        "title_gold": "Selvaggio.",
        "title_outline": "Finanzia",
        "title_part2": "il Futuro.",
        "subtitle": "Un'impresa di miele legata alla biodiversità nata dalle terre selvagge del Parco Nazionale di Maputo: raccolto dalla comunità, protetto dalla natura.",
        "discover": "Scopri il Miele",
        "see_impact": "Vedi l'Impatto"
      },
      "stats": {
        "hives": "Arnie Attive",
        "families": "Famiglie",
        "potential": "Potenziale"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
