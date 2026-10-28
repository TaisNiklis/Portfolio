# case-study-writer · v0.1 (draft)

A Claude skill that turns raw project material into a product-design case study for the
portfolio. The case is written in English as MDX, ready for the site.

## Як користуватись
1. Відкрий сесію Claude Code з цим репозиторієм.
2. Напиши, наприклад: «Оформи кейс про AI-асистента в ANODA» і додай нотатки, тексти з
   Behance, скріни, цифри.
3. Claude поставить до 5 уточнювальних питань, запропонує 3 назви кейсу, напише чернетку,
   перевірить її за чеклістом і дасть список потрібних картинок.

Для claude.ai: заархівуй папку `case-study-writer` у zip і завантаж у Settings → Capabilities → Skills.

## Структура
- `SKILL.md`: робочий процес
- `references/`: структура кейсу, правила, що шукають рекрутери і профіль
- `checklists/`: сирий матеріал і перевірка якості
- `templates/case-study.mdx`: шаблон

## Наступні версії
- v0.2: приклад готового кейсу в `examples/` після першого реального кейсу
- v0.3: власний голос і стиль тексту
