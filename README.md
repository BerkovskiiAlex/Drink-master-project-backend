<!-- @format -->

# Drink-master-project-backend

дотсупные запросы:

1. https://drink-master-project.onrender.com/api/auth/users/signup - запрост .post, тело
   {
   "username": "",
   "email": "",
   "password": ""
   "birthdate": "ГГ-ММ-ДД"
   }
   (в этом случае аватарка у пользователя будет дефолтная)

2. https://drink-master-project.onrender.com/api/auth/users/signup - запрост .post в формате form-data, тело
   {
   username
   email
   password
   avatar -- выбранный вами файл до 5мб
   "birthdate": "ГГ-ММ-ДД"
   }
   (в этом случае аватарка у пользователя будет выбранная вами но на запрос уходит примерно 10 секунд, наверное это зависит от скорости загрузки картинки от пользователю к серверу render.com)

3. https://drink-master-project.onrender.com/api/auth/users/login - запрост .post, тело
   {
   "email": "",
   "password": ""
   }

4. https://drink-master-project.onrender.com/api/auth/users/logout - запрост .post с вашим токеном в авторизации, ответ - успешный 204 статус без тела ответа

5. https://drink-master-project.onrender.com/api/auth/users/current - запрост .get с вашим токеном в авторизации и почтой, ответ - успешный 200 статус с телом
   {
   "email": "",
   "subscription": ""
   }

6. https://drink-master-project.onrender.com/api/auth/users/update - запрос .patch с вашим токеном в авторизации новым username и файлом аватарки в формате form-data, ответ - успешный 200 статус с новым расположением аватарки и username

7. https://drink-master-project.onrender.com/api/filters/ingredients?gape=1&limit=5 - запрос .get с вашим токеном в авторизации и возможностью пагинации: page, limit(по дефолту gape=1&limit=10), ответ - успешный 200 статус со списком ингридиентов
