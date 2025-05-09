# ThaiFlashCards
Обучающее приложение для заучивания тайских слов в формате карточек (за основу взяты Anki)

# Функционал
- Карточка с Тайским словом -> на обратной стороне перевод + транскрипция
- Проигрывание тайского слова встроенным Web Speech API (Thai)
- Все данные хранятся в словарике внутри проекта 
- Бекенд не используется

# Формат слова (JSON)
```json
{
  "word": "สวัสดี",
  "transcription": "саватди́и",
  "translation": "hello"
}
```

🚀 Как запустить
```bash
git clone https://github.com/maeshchenko/ThaiFlashCards
cd ThaiFlashCards
npm install
npm start
```