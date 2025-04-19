require("dotenv").config();
class MyController {
  api = process.env.APIKEY;
  //la instruccion es que solo pide la ciudad por lo que el estado y el continente seran datos fijos
  state = "Mexico";
  country = "America";
  constructor() {
    if (!this.api.length)
    throw new Error("Api key not found");
  }
  async getCoordenadas(city) {
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${this.state},${this.country}&appid=${this.api}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await response.json();
      //si no encuantra la ciudad
      if (!resp.length) return "City no found";
      //despues de obtener la lat y lon obtenemos el clima
      return this.getClima(resp[0].lat, resp[0].lon);
    } catch (error) {
      console.log("Ocurrio un error al obtener coordenadas");
    }
  }
  async getClima(lat, lon) {
    try {
      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.api}`;
      const response = await fetch(url2, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await response.json();
      //creamos un objeto para devolver solo ciertos datos
      const data = {
        Location: resp.name,
        clima: {
          name: resp.weather[0].main,
          description: resp.weather[0].description,
        },
        temperatura: this.#kelvinToCelsius(resp.main.temp),
        clouds: `${resp.clouds.all} %`,
      };
      return data;
    } catch (error) {
      console.error("Ocurrio un error al obtener el clima");
      return "Error to get the wheather";
    }
  }

  #kelvinToCelsius(kelvin) {
    return `${Number((kelvin - 273.15).toFixed(2))} °C`;
  }
}

module.exports = MyController;
