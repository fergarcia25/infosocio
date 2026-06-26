# include/api-helpers.php

Helper functions for calling the admin-html REST API:

### `apiCall($action, $params = [], $method = 'GET')`
- Build URL: `./api/index.php?action=` . $action . (extra query params for GET)
- For POST/PUT: use cURL with JSON body
- Return decoded JSON response (assoc array)
- Handle errors gracefully (return success=false array)

### `apiCallGet($action, $params = [])`
- Wrapper for GET requests

### `apiCallPost($action, $data = [])`
- Wrapper for POST requests with JSON body

### `apiCallPut($action, $data = [])`
- Wrapper for PUT requests with JSON body

### Endpoints used:
| Action | Method | Purpose |
|---|---|---|
| login | POST | Auth login |
| logout | GET | Auth logout |
| check-auth | GET | Verify session |
| dashboard | GET | Get stats + daily data |
| solicitudes | GET | List solicitudes with filters |
| solicitud&id=X | GET | Get single solicitud |
| actualizar-solicitud | PUT | Update solicitud estado |
| precio | GET | Get current price |
| actualizar-precio | PUT | Update price |
| precio-publico | GET | Get public price |
| create-preference | POST | Create MP payment |
| send-email | POST | Send contact email |
