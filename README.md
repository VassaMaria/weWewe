# CRM System for Online Store

This project is a CRM (Customer Relationship Management) system designed for managing customers, products, and orders for an online store. It also includes features for authentication, authorization, and data security.

## Features

- **User Management**: Create, read, update, delete users with roles (admin, guest, client, sales manager).
- **Product Management**: Manage products with name and price.
- **Order Management**: Manage orders with user, product, and quantity details.
- **Authentication & Authorization**: Secure login using JWT and role-based access control.
- **REST API**: Fully functional API for integrating with external systems.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VassaMaria/psychic-spork.git
   cd psychic-spork
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```bash
   python -m flask shell
   >>> from app import db
   >>> db.create_all()
   ```

5. Run the server:
   ```bash
   python run.py
   ```

6. Access the application:
   Open your browser and navigate to `http://127.0.0.1:5000`.

## API Endpoints

### Authentication
- **Login**:
  ```http
  POST /login
  {
      "email": "user@example.com",
      "password": "password123"
  }
  ```
- **Logout**:
  ```http
  POST /logout
  ```

### Users
- **Create User**:
  ```http
  POST /api/users
  {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "client"
  }
  ```
- **Get All Users**:
  ```http
  GET /api/users
  ```
- **Get User by ID**:
  ```http
  GET /api/users/<user_id>
  ```
- **Delete User**:
  ```http
  DELETE /api/users/<user_id>
  ```

### Products
- **Create Product**:
  ```http
  POST /api/products
  {
      "name": "Laptop",
      "price": 999.99
  }
  ```
- **Get All Products**:
  ```http
  GET /api/products
  ```
- **Get Product by ID**:
  ```http
  GET /api/products/<product_id>
  ```
- **Delete Product**:
  ```http
  DELETE /api/products/<product_id>
  ```

### Orders
- **Create Order**:
  ```http
  POST /api/orders
  {
      "user_id": 1,
      "product_id": 2,
      "quantity": 3
  }
  ```
- **Get All Orders**:
  ```http
  GET /api/orders
  ```
- **Get Order by ID**:
  ```http
  GET /api/orders/<order_id>
  ```
- **Delete Order**:
  ```http
  DELETE /api/orders/<order_id>
  ```

## Security Features

- **Password Hashing**: All user passwords are hashed using `werkzeug.security`.
- **JWT Authentication**: Secure user sessions using JSON Web Tokens.
- **Role-Based Access Control**: Protect routes based on user roles (e.g., `admin`, `client`).

## Project Structure

```
crm_project/
├── app/
│   ├── __init__.py    # App initialization
│   ├── models.py      # Database models
│   ├── resources/     # API endpoints
│   │   ├── user.py    # User management
│   │   ├── product.py # Product management
│   │   └── order.py   # Order management
├── config.py          # Configuration settings
├── requirements.txt   # Python dependencies
└── run.py             # Entry point for running the server
```

## Future Improvements

- Add pagination for large datasets.
- Implement search and filtering for users, products, and orders.
- Enhance security with two-factor authentication.

## Contributing

Feel free to fork this repository and submit pull requests to improve functionality or add new features.

## License

This project is licensed under the MIT License.