<!-- para revisar los endpoints y usarlos utiliza postman o thunderclient -->
1. Traer clima de tu ciudad
- **Endpoint**: http://localhost:3000/api/weather 
```json
{
  "city": "MyCity"
}
```
-- **Response**
```json
{
    "clima": {
        "name": "Clouds",
        "description": "overcast clouds"
    },
    "temperatura": "27.59 °C",
    "clouds": "97 %"
}
```