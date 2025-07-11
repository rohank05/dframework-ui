# Breaking changes

## 1. Crud-helper

- In `getList` fucntion, pass project specific data using extra params. (removed orderStatusId, userTimezoneOffset)

## 2. grid/index.js

- In `updateFilters`, removed CoolR specifc code, `OrderSuggestionHistoryFields`
- In `onCellClickHandler`, removed custom code for isAcostaController
- In  `GridBase` removed custom code for `isOrderDetailModalOpen`.
