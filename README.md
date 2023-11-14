<!-- @format -->

# Drink-master-project-backend

дотсупные запросы:

1. https://drink-master-project.onrender.com/api/auth/users/signup - запрост .post, тело
   {
   "username": "",
   "email": "",
   "password": ""
   }
   (в этом случае аватарка у пользователя будет дефолтная)

2. https://drink-master-project.onrender.com/api/auth/users/signup - запрост .post в формате form-data, тело
   {
   username
   email
   password
   avatar выбранный вами файл до 5мб
   }
   (в этом случае аватарка у пользователя будет выбранная вами но на запрос уходит примерно 10 секунд, наверное это зависит от скорости загрузки картинки от пользователю к серверу render.com)

3. https://drink-master-project.onrender.com/api/auth/users/login - запрост .post, тело
   {
   "email": "",
   "password": ""
   }

4. https://drink-master-project.onrender.com/api/auth/users/logout - запрост .post с вашим токеном в авторизации, ответ - успешный 204 статус без тела ответа
