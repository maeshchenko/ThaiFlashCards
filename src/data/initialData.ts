import { Flashcard } from '../types/flashcard';

const topWords = {
  "top10": [
    {
      "word": "ผม",
      "transcription": "phǒm",
      "translation": "я"
    },
    {
      "word": "คุณ",
      "transcription": "khun",
      "translation": "ты"
    },
    {
      "word": "อะไร",
      "transcription": "à-rai",
      "translation": "что"
    },
    {
      "word": "ใคร",
      "transcription": "khrai",
      "translation": "кто"
    },
    {
      "word": "ที่ไหน",
      "transcription": "thîi-nǎi",
      "translation": "где"
    },
    {
      "word": "เมื่อไร",
      "transcription": "mûea-rai",
      "translation": "когда"
    },
    {
      "word": "ขอบคุณ",
      "transcription": "khàawp-khun",
      "translation": "спасибо"
    },
    {
      "word": "ขอโทษ",
      "transcription": "khǎaw-thôot",
      "translation": "извини / прости"
    },
    {
      "word": "สบายดีไหม",
      "transcription": "sà-baai-dii mái?",
      "translation": "как дела?"
    },
    {
      "word": "สบายดี",
      "transcription": "sà-baai-dii",
      "translation": "хорошо"
    }
  ],
  "next20": [
    {
      "word": "กิน",
      "transcription": "kin",
      "translation": "есть"
    },
    {
      "word": "ดื่ม",
      "transcription": "dùuem",
      "translation": "пить"
    },
    {
      "word": "ไป",
      "transcription": "pai",
      "translation": "идти"
    },
    {
      "word": "ทำ",
      "transcription": "tham",
      "translation": "делать"
    },
    {
      "word": "เรียน",
      "transcription": "rian",
      "translation": "учиться"
    },
    {
      "word": "พูด",
      "transcription": "phûut",
      "translation": "говорить"
    },
    {
      "word": "รัก",
      "transcription": "rák",
      "translation": "люблю"
    },
    {
      "word": "คิดถึง",
      "transcription": "khít-thʉ̌ng",
      "translation": "скучаю"
    },
    {
      "word": "ทุกวัน",
      "transcription": "thúk-wan",
      "translation": "каждый день"
    },
    {
      "word": "พบ",
      "transcription": "phóp",
      "translation": "встречать"
    },
    {
      "word": "แมว",
      "transcription": "maaeo",
      "translation": "кошка"
    },
    {
      "word": "หมา",
      "transcription": "mǎa",
      "translation": "собака"
    },
    {
      "word": "บ้าน",
      "transcription": "bâan",
      "translation": "дом"
    },
    {
      "word": "น้ำ",
      "transcription": "náam",
      "translation": "вода"
    },
    {
      "word": "เปิด",
      "transcription": "pòoet",
      "translation": "открыть"
    },
    {
      "word": "ปิด",
      "transcription": "pìt",
      "translation": "закрыть"
    },
    {
      "word": "เงิน",
      "transcription": "ngoen",
      "translation": "деньги"
    },
    {
      "word": "ทำงาน",
      "transcription": "tham-ngaan",
      "translation": "работать"
    },
    {
      "word": "อ่าน",
      "transcription": "àan",
      "translation": "читать"
    },
    {
      "word": "เขียน",
      "transcription": "khǐan",
      "translation": "писать"
    }
  ],
  "essentialWords": [
    { word: "ผม", transcription: "пхо̆м", translation: "я" },
    { word: "คุณ", transcription: "кхўн", translation: "ты" },
    { word: "เรา", transcription: "ра́о", translation: "мы" },
    { word: "พวกเขา", transcription: "пху́ак кха́о", translation: "они" },
    { word: "เขา", transcription: "кха́о", translation: "он" },
    { word: "เธอ", transcription: "тхөө", translation: "она" },
    { word: "มัน", transcription: "ман", translation: "оно" },
    { word: "ที่ไหน", transcription: "тхи̂-на́й", translation: "где" },
    { word: "เมื่อไร", transcription: "му̂а-рай", translation: "когда" },
    { word: "ใคร", transcription: "кхрай", translation: "кто" },
    { word: "อะไร", transcription: "а-рай", translation: "что" },
    { word: "อย่างไร", transcription: "йа̀нг-рай", translation: "как" },
    { word: "เท่าไหร่", transcription: "та́о-рай", translation: "сколько (неисчисл.)" },
    { word: "กี่", transcription: "кии̂", translation: "сколько (исчисл.)" },
    { word: "นานแค่ไหน", transcription: "наан кэ̂э най", translation: "как долго" },
    { word: "อายุเท่าไหร่", transcription: "а́а-ю та́о-рай", translation: "сколько лет" },
    { word: "สบายดีไหม", transcription: "сӑбай-ди̌и ма́й", translation: "как дела?" },
    { word: "สบายดี", transcription: "сӑбай-ди̂и", translation: "хорошо" },
    { word: "ขอบคุณ", transcription: "кхоопку́н", translation: "спасибо" },
    { word: "ขอโทษ", transcription: "кхо̆о-то̂т", translation: "извини / прости" },
    { word: "สวัสดีตอนเช้า", transcription: "са̀ватди́и тон чáо", translation: "доброе утро" },
    { word: "สวัสดีตอนบ่าย", transcription: "са̀ватди́и тон ба̀ай", translation: "добрый день" },
    { word: "สวัสดีตอนเย็น", transcription: "са̀ватди́и тон йен", translation: "добрый вечер" },
    { word: "แล้วเจอกัน", transcription: "ле́о чə́ə кан", translation: "увидимся" },
    { word: "นี่", transcription: "ни̂и", translation: "это" },
    { word: "นั่น", transcription: "нан", translation: "то" },
    { word: "กรุณา", transcription: "кару́наа", translation: "пожалуйста" },
    { word: "เชิญเข้ามา", transcription: "чэən кха̂о маа", translation: "входи" },
    { word: "นั่งลง", transcription: "нанг лонг", translation: "садись" },
    { word: "ที่นี่", transcription: "тхи̂-ни̂и", translation: "здесь" },
    { word: "พบ", transcription: "пхоп", translation: "встречать" },
    { word: "ทุกวัน", transcription: "тхук ван", translation: "каждый день" },
    { word: "วิ่ง", transcription: "винг", translation: "бегать" },
    { word: "เดิน", transcription: "дөөн", translation: "ходить" },
    { word: "นอน", transcription: "ноон", translation: "спать" },
    { word: "กิน", transcription: "кин", translation: "есть" },
    { word: "ดื่ม", transcription: "ды̀ым", translation: "пить" },
    { word: "ไป", transcription: "пай", translation: "идти" },
    { word: "ซื้อ", transcription: "сы́ы", translation: "покупать" },
    { word: "อาหาร", transcription: "а-ха̌ан", translation: "еда" },
    { word: "เรียน", transcription: "риан", translation: "учиться" },
    { word: "ภาษาไทย", transcription: "паа-саӑ-тай", translation: "тайский язык" },
    { word: "เขียน", transcription: "кхйан", translation: "писать" },
    { word: "อ่าน", transcription: "а̀ан", translation: "читать" },
    { word: "พูด", transcription: "пу̂ут", translation: "говорить" },
    { word: "ชอบ", transcription: "чо̂оп", translation: "ты мне нравишься" },
    { word: "รัก", transcription: "ра́к", translation: "люблю" },
    { word: "คิดถึง", transcription: "кхи́т тʉ̆нг", translation: "скучаю" },
    { word: "ปวดหัว", transcription: "пуа̀т ху̌а", translation: "головная боль" },
    { word: "ปวดท้อง", transcription: "пуа̀т тхо́нг", translation: "боль в животе" },
    { word: "ทำงาน", transcription: "тхам-нгаан", translation: "работать" },
    { word: "พรุ่งนี้", transcription: "пру̂нг ни̂и", translation: "завтра" },
    { word: "ได้", transcription: "да̂й", translation: "получить" },
    { word: "ทำ", transcription: "тхам", translation: "делать" },
    { word: "เล่น", transcription: "лэн", translation: "играть" },
    { word: "ทำอาหาร", transcription: "тхам а-ха̌ан", translation: "готовить" },
    { word: "น้ำ", transcription: "на́ам", translation: "вода" },
    { word: "ขี่จักรยาน", transcription: "кхѝ чàк-гра-yaan", translation: "ехать на велосипеде" },
    { word: "จักรยาน", transcription: "чàк-гра-yaan", translation: "велосипед" },
    { word: "เมื่อวาน", transcription: "мʉ̂а ваан", translation: "вчера" },
    { word: "แล้ว", transcription: "лэ́эу", translation: "уже" },
    { word: "วันนี้", transcription: "ван ни̂и", translation: "сегодня" },
    { word: "เปลี่ยน", transcription: "плѝан", translation: "менять" },
    { word: "โทรศัพท์มือถือ", transcription: "тхо-ра-сап мʉʉ тʉ̆ʉ", translation: "мобильный телефон" },
    { word: "อาศัยอยู่ในประเทศไทย", transcription: "а-сӑй йу̀у най пратхет тай", translation: "живу в Таиланде" },
    { word: "ดู", transcription: "дуу", translation: "смотреть" },
    { word: "ฝนตก", transcription: "фо̆н то̀к", translation: "дождь идёт" },
    { word: "ขับรถ", transcription: "кха̀п рот", translation: "водить машину" },
    { word: "ส่ง", transcription: "со̀нг", translation: "отправлять" },
    { word: "เงิน", transcription: "нгɵн", translation: "деньги" },
    { word: "เปิด", transcription: "пə̀ət", translation: "открыть" },
    { word: "ปิด", transcription: "пѝт", translation: "закрыть" },
    { word: "ร้านกาแฟ", transcription: "ра́ан га-фээ", translation: "кофейня" },
    { word: "บ้าน", transcription: "ба̂ан", translation: "дом" },
    { word: "ทำความสะอาด", transcription: "тхам-кхуаам-са-а̀ат", translation: "убирать" },
    { word: "สูบบุหรี่", transcription: "су̀уп бу̀-рѝи", translation: "курить" },
    { word: "แมว", transcription: "мээо", translation: "кошка" },
    { word: "หมา", transcription: "ма̌а", translation: "собака" },
    { word: "ใส่", transcription: "сай", translation: "носить" },
    { word: "เสื้อ", transcription: "сы̂а", translation: "рубашка" },
    { word: "ข้ามถนน", transcription: "кха̂ам тха-но̌н", translation: "переходить дорогу" }
  ],
  "letters1": [
    {word: 'ฟ ฟัน', transcription: 'fo', translation: 'ฟัน (fan) зуб'},
    {word: 'ห หีบ', transcription: 'ho', translation: 'หีบ (heep) сундук'},
    {word: 'ก ไก่', transcription: 'ko', translation: 'ไก่ (kai) курица'},
    {word: 'ด เด็ก', transcription: 'do', translation: 'เด็ก (dek) ребёнок'},
  ],
  "letters2": [
    {word: ' ่ ไม้เอก', transcription: 'mái èek', translation: 'низкий тон'},
    {word: 'า กา', transcription: 'sà-ra àa', translation: 'กา (gaa) — чай, ворона'},
    {word: 'ส เสือ', transcription: 'so', translation: 'เสือ (sʉ̌a) — тигр'},
    {word: 'ว แหวน', transcription: 'wo', translation: 'แหวน (wǎen) — кольцо'},
  ]
}

export const initialFlashcards: Flashcard[] = topWords.top10.map((word, index) => ({
  id: index + 1,
  ...word,
  nextShowAt: 0
}));