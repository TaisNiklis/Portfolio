# case-study-writer · v0.2 (draft)

A Claude skill that turns raw project material into a product-design case study for the
portfolio. The case is written in English as MDX, ready for the site.

## Як користуватись
1. Відкрий сесію Claude Code з цим репозиторієм.
2. Напиши, наприклад: «Оформи кейс про AI-асистента в ANODA» і додай нотатки, тексти з
   Behance, скріни, цифри.
3. Claude поставить до 5 уточнювальних питань, запропонує 3 назви кейсу, напише чернетку,
   перевірить її за чеклістом і дасть список потрібних картинок.
4. Щоб вставити кейс у дизайн, попроси «дай текст без розмітки». Отримаєш звичайний текст
   і окремий список фраз, які варто виділити.

Для claude.ai: заархівуй папку `case-study-writer` у zip і завантаж у Settings → Capabilities → Skills.

## Структура
- `SKILL.md`: робочий процес
- `references/`: структура кейсу, правила, що шукають рекрутери і профіль
- `checklists/`: сирий матеріал і перевірка якості
- `templates/case-study.mdx`: шаблон
- `examples/`: готовий кейс як зразок

## Історія версій
- v0.2: зразок кейсу (AI marketing platform); `order` числом + окреме поле `project`;
  режим тексту без розмітки для дизайну; блок «AI in my process» тільки з підтвердженого.
- v0.1: перша чернетка.

## Наступні версії
- v0.3: власний голос і стиль тексту (після 2–3 кейсів)
