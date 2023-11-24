<!-- @format -->

# Drink-master-project-backend

дотсупные запросы:

1. https://drink-master-project.onrender.com/api/auth/users/signup - запрост .post, тело
   {
   "username": "",
   "email": "",
   "password": ""
   "birthdate": "ГГ-ММ-ДД" -------------- пример: "1990-03-20"
   }
   (в этом случае аватарка у пользователя будет дефолтная)

2. https://drink-master-project.onrender.com/api/auth/users/signup - запрос .post в формате form-data, тело
   {
   username
   email
   password
   avatar -- выбранный вами файл до 5мб
   "birthdate": "ГГ-ММ-ДД" -------------- пример: "1990-03-20"
   }
   (в этом случае аватарка у пользователя будет выбранная вами но на запрос уходит примерно 10 секунд, наверное это зависит от скорости загрузки картинки от пользователю к серверу render.com)

3. https://drink-master-project.onrender.com/api/auth/users/login - запрос .post c email и password, тело ответа:
   {
   "token": "...",
   "username": "...",
   "email": "...",
   "isAdult": Boolean,
   "avatarUrl": "..."
   }

4. https://drink-master-project.onrender.com/api/auth/users/logout - запрос .post с вашим токеном в авторизации, ответ - успешный 204 статус без тела ответа

5. https://drink-master-project.onrender.com/api/auth/users/current - запрос .get с вашим токеном в авторизации, ответ - успешный 200 статус с телом
   {
   "token": "...",
   "username": "...",
   "email": "...",
   "isAdult": Boolean,
   "avatarUrl": "..."
   }

6. https://drink-master-project.onrender.com/api/auth/users/update - запрос .patch с вашим токеном в авторизации новым username, файлом аватарки или username + файл аватарки одновременно в формате form-data, ответ - успешный 200 статус с новым расположением аватарки и username

7. https://drink-master-project.onrender.com/api/filters/ingredients?page=2&limit=5 - запрос .get с вашим токеном в авторизации и возможностью пагинации: page, limit(по дефолту gape=1&limit=10), ответ - успешный 200 статус со списком ингридиентов

8. https://drink-master-project.onrender.com/api/filters/categories - запрос .get с вашим токеном в авторизации, ответ - успешный 200 статус с массивом всех категорий в алфавитном порядке

9. https://drink-master-project.onrender.com/api/filters/glasses - запрос .get с вашим токеном в авторизации, ответ - успешный 200 статус с массивом всех стаканов в алфавитном порядке

10. https://drink-master-project.onrender.com/api/drinks/cocktails/main?category=Other/Unknown,Beer,Cocoa - запрос .get с вашим токеном в авторизации, категорией и возможностью пагинации: page, limit(по дефолту gape=1&limit=10), ответ - успешный 200 статус со списком коктейлей по выбранным категориям в зависимости от совершеннолетия позьзователя

11. https://drink-master-project.onrender.com/api/drinks/popular?top=2 - запрос .get с вашим токеном в авторизации и возможностью выбора количества наипопулярнейших коктейлей, ответ - успешный 200 статус со списком коктейлей перечисленных по убыванию и в зависимости от совершеннолетия позьзователя

12. https://drink-master-project.onrender.com/api/drinks/favorite/add - запрос .post с вашим токеном в авторизации и "drinkId": "..." в теле запроса, ответ - успешный 201 статус с телом
    {
    "message": "Drink has been added to favorites"
    }

13. https://drink-master-project.onrender.com/api/drinks/favorite/remove/655d6d516c62290dfa2ac012 - (655d6d516c62290dfa2ac012 - это id коктейля, который пользователь добавил в избранное ранее) - запрос .delete с вашим токеном в авторизации, ответ - успешный 204 статус

14. https://drink-master-project.onrender.com/api/drinks/search?page=1&limit=5&category=Shake&keyword=Just a Moonmint&ingredientId=64aebb7f82d96cc69e0eb4d7 - запрос .get с вашим токеном в авторизации и параметрами запроса в виде: {
    page
    limit
    category
    keyword -------- это ключевое слово в названии коктейля (drink) или в его описании (description)
    ingredientId ------------ это айди ингридиента
    }, ответ - успешный 200 статус с коктейлями, удовлетворяющими параметры запроса. Параметры запроса не обязательны для заполнения, если их не будет то ответ будет дефолтным - это 10 коктейлей в ответе с учётом совершеннолетия пользователя

15. https://drink-master-project.onrender.com/api/drinks/favorite - запрос .get с вашим токеном и возможностью пагинации, ответ - успешный 200 статус с коктейлями пользователя в избранном.

16. https://drink-master-project.onrender.com/api/drinks/639b6de9ff77d221f190c563 - запрос .get с айди коктейля в параметрах вызова, ответ - успешный 200 статус с коктейлем. Индентификация пользователя не производится.

17. https://drink-master-project.onrender.com/api/drinks/own/add - запрос .post с вашим токеном и телом запроса в формате form-data первый ключ которого называется drinkPhoto и является файлом. Пример запроса:
    {
    "drink": "...",
    "category": "одна из категорий",
    "description": "...",
    "instructions": "...",
    "glass": "один из видов стаканов",
    "alcoholic": "Non alcoholic", -------- или "Alcoholic"
    "ingredients": [
    {
    "title": "название индигридиента",
    "ingredientId": "айди ингридиента"
    },
    {
    "title": "название индигридиента",
    "ingredientId": "айди ингридиента"
    }]
    }, ингридиент должен быть минимум 1 с названием и айди. Остальные возможные поля можно посмотреть в описании коктейлей, по дефолту они пустые. Несовершеннолетние пользователи не могут добавлять алкогольные напитки. Ответ - успешный 201 статус с созданным коктейлем.

18. https://drink-master-project.onrender.com/api/drinks/own/remove/655d6d516c62290dfa2ac012 - (655d6d516c62290dfa2ac012 - это id коктейля, который пользователь добавил ранее) - запрос .delete с вашим токеном в авторизации, ответ - успешный 204 статус

19. https://drink-master-project.onrender.com/api/drinks/own - запрос .get с вашим токеном в авторизации, ответ - успешный 200 статус cо списком созданных пользователем коктейлей

20. https://drink-master-project.onrender.com/api/privacy/policy - запрос .get, ответ - успешный 200 статус c параграфами текста

21. https://drink-master-project.onrender.com/api/privacy/public - запрос .get, ответ - успешный 200 статус c параграфами текста

22. https://drink-master-project.onrender.com/api/auth/users/subscribe?email=migew56640@bustayes.com - запрос .get с вашим токеном в авторизации и имейлом в параметрах запроса, ответ - успешный 200 статус с сообщением "message": "Subscription email send success"
