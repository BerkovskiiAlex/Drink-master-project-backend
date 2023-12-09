<!-- @format -->

## Drink Master Project Backend

## BASE_URL=https://drink-master-project.onrender.com

### Overview

The Drink Master Project Backend serves as the server-side component for the [Drink Master web application](https://drink-master-project.vercel.app/welcome). It provides a RESTful API to manage user authentication, favorite drinks, user-created drinks, filters, and more.

### API Endpoints

1. **User Signup**

   - **Endpoint:** `POST /api/auth/users/signup`
   - **Description:** Register a new user.
   - **Request Body:**
     ```json
     {
       "username": "",
       "email": "",
       "password": "",
       "birthdate": "YYYY-MM-DD"
     }
     ```
   - **Response:** User object with default avatar.

2. **User Signup with Avatar**

   - **Endpoint:** `POST /api/auth/users/signup`
   - **Description:** Register a new user with a custom avatar.
   - **Request Body:** Form data with fields:
     - `username`
     - `email`
     - `password`
     - `avatar` (file, up to 5MB)
     - `birthdate`: "YYYY-MM-DD"
   - **Response:** User object with the selected avatar.

3. **User Login**

   - **Endpoint:** `POST /api/auth/users/login`
   - **Description:** Log in an existing user.
   - **Request Body:**
     ```json
     {
       "email": "",
       "password": ""
     }
     ```
   - **Response:** User token, username, email, age status, and avatar URL.

4. **User Logout**

- **Endpoint:** `POST /api/auth/users/logout`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Log out the current user.
- **Response:** 204 No Content.

5. **Get Current User**

- **Endpoint:** `GET /api/auth/users/current`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Get details of the currently logged-in user.
- **Response:** User details.

6. **Update User Profile**

- **Endpoint:** `PATCH /api/auth/users/update`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Update user profile, including username and/or avatar.
- **Request Body:** Form data with fields:
  - `username` (optional)
  - `avatar` (optional, file)
- **Response:** Updated user details.

7. **Get Ingredients**

- **Endpoint:** `GET /api/filters/ingredients`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Get a list of all available ingredients.
- **Response:** List of ingredients.

8. **Get Categories**

- **Endpoint:** `GET /api/filters/categories`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Get an alphabetically ordered list of all categories.
- **Response:** List of categories.

9. **Get Glasses**

- **Endpoint:** `GET /api/filters/glasses`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Get an alphabetically ordered list of all glasses.
- **Response:** List of glasses.

10. ## Get Cocktails by Category

- **Endpoint:** `GET /api/drinks/cocktails/main`
- **Description:** Retrieve a list of cocktails categorized by the specified categories, with optional pagination.
- **Parameters:**
  - `page` (optional): Page number for pagination (default is 1).
  - `limit` (optional): Number of items per page (default is 4).
  - `category`: Comma-separated list of categories for filtering cocktails.
- **Response:**
  - Returns a list of cocktails categorized based on age-appropriate criteria.
  - The response is organized by category, and each category includes a paginated list of cocktails.
- **Authorization:**
  - Requires a valid user token for authentication.
- **Notes:**
  Ensure that at least one category is provided in the category parameter.
  Pagination is supported with page and limit parameters.
  The response includes age-appropriate cocktails based on the user's status (Alcoholic or Non-alcoholic).
- **Example Request:**
  ```http
  GET /api/drinks/cocktails/main?category=Shake,Beer,Cocoa&page=1&limit=4
  ```

11. ## Get Popular Cocktails

- **Endpoint:** `GET /api/drinks/popular?top={count}`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Retrieve a list of the top N popular cocktails.
- **Parameters:**
  - `top`: Number of popular cocktails to retrieve.
- **Response:**
  - Returns a list of popular cocktails based on the specified count.
  - The response includes cocktails listed in descending order of popularity.

12. **Add to Favorite Drinks**

- **Endpoint:** `POST /api/drinks/favorite/add`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Add a drink to the user's favorites.
- **Request Body:**
  `json
{
  "drinkId": "..."
}
`
- **Response:** Success message.

13. **Remove from Favorite Drinks**

- **Endpoint:** `DELETE /api/drinks/favorite/remove/{drinkId}`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Remove a drink from the user's favorites.
- **Response:** 204 No Content.

14. ## Search Cocktails

- **Endpoint:** `GET /api/drinks/search`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Search for cocktails based on optional parameters.
- **Parameters:**
  - `page` (optional): The page number for pagination (default: 1).
  - `limit` (optional): The number of cocktails per page (default: 10).
  - `category` (optional): Filter cocktails by category.
  - `keyword` (optional): Search term for matching cocktail names or descriptions.
  - `ingredientId` (optional): Filter cocktails by a specific ingredient.
- **Response:**
  - Returns a list of matching cocktails based on the specified parameters.
  - The response includes pagination details.
- **Example Request:**
  ```http
  GET /api/drinks/search?page=1&limit=10&category=Shake&keyword=Just a Moonmint&ingredientId=64aebb7f82d96cc69e0eb4d7
  ```

15. **Get User's Favorite Drinks**

- **Endpoint:** `GET /api/drinks/favorite`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Get the user's favorite drinks with optional pagination.
- **Response:** List of favorite drinks.

16. **Get Drink Details by ID**

- **Endpoint:** `GET /api/drinks/{drinkId}`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Get details of a specific drink by ID.
- **Response:** Drink details with favorite status.

17. ## Add User-Created Drink

- **Endpoint:** `POST /api/drinks/own/add`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Add a user-created drink to the platform.
- **Request Body:**
  - Form data with fields for drink details, including a drink photo.
- **Fields:**
  - `drink` (string): Name of the drink.
  - `category` (string): Category of the drink.
  - `description` (string): Description of the drink.
  - `instructions` (string): Preparation instructions for the drink.
  - `glass` (string): Type of glass to be used.
  - `alcoholic` (string): Alcoholic content ("Alcoholic" or "Non alcoholic").
  - `ingredients` (array): Array of ingredients, each containing `title` and `ingredientId`.
  - `drinkPhoto` (file): Image file representing the drink.
- **Response:**
  - Details of the created drink.
- **Authorization:**
  - Requires a valid user token for authentication.
- **Example Request:**
  ```http
  POST /api/drinks/own/add
  Form Data:
    drink: "Mocktail Delight"
    category: "Mocktail"
    description: "A refreshing non-alcoholic delight."
    instructions: "Mix and stir, and your Mocktail Delight is ready!"
    glass: "Highball Glass"
    alcoholic: "Non alcoholic"
    ingredients[0][title]: "Lemon Juice"
    ingredients[0][ingredientId]: "64aebb7f82d96cc69e0eb4d5"
    drinkPhoto: [image file]
  ```
- **Notes:**
  The request should include a valid user token for authentication.
  The response includes details of the newly created drink.
  A user must provide essential details, including a drink photo, to add a drink.

18. **Remove User-Created Drink**

- **Endpoint:** `DELETE /api/drinks/own/remove/{drinkId}`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Remove a user-created drink.
- **Response:** 204 No Content.

19. **Get User's Own Drinks**

- **Endpoint:** `GET /api/drinks/own`
- **Authorization:**
  - Requires a valid user token for authentication.
  - **Parameters:**
  - `page` (optional): Page number for pagination (default is 1).
  - `limit` (optional): Number of items per page (default is 10).
- **Description:** Get drinks created by the user, with optional pagination.
- **Response:** List of user-created drinks.

20. **Privacy Policy**

- **Endpoint:** `GET /api/privacy/policy`
- **Description:** Get privacy policy details.
- **Response:** Privacy policy text.

21. **Public offerings**

- **Endpoint:** `GET /api/privacy/public`
- **Description:** Get public offerings details.
- **Response:** Public offerings text.

22. **Subscribe to Newsletter**

- **Endpoint:** `GET /api/auth/users/subscribe?email={email}`
- **Authorization:**
  - Requires a valid user token for authentication.
- **Description:** Subscribe to the newsletter with the provided email.
- **Response:** Success message.

23. **Application Status**

- **Endpoint:** `GET /api/application`
- **Description:** Check the status of the API.
- **Response:** Success message.

### Usage

- Ensure you have the necessary permissions and a valid token for protected routes.
- For file uploads, use the `multipart/form-data` format.
- Follow the provided request examples for accurate data submission.

Feel free to explore the Drink Master Project Backend API and leverage its functionality for a delightful user experience in the Drink Master web application. Cheers! 🍹🎉
