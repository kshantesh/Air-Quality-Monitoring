
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define factor 1000000
#define sleep_time 1
#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme; // I2C
const char* ssid = "D-Link_DIR-600M";
const char* password = "ashu1999";

//Your Domain name with URL path or IP address with path
const char* serverName = "http://192.168.0.3:4000/api";
unsigned long lastTime = 0;

unsigned long delayTime;
int COpin=4;
int CO2pin=2;
void bmeSetup(){
  Serial.println(F("BME280 test"));
  bool status;
  // default settings
  // (you can also pass in a Wire library object like &Wire2)
  status = bme.begin(0x76);  
  if (!status) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
  Serial.println("-- Default Test --");
  delayTime = 1000;
  Serial.println();  
}
void wifiSetup(){
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}
String jsonToString(float humidity=random(20,100),float temperature=random(20,50),float pm25=random(20,100),float CO=random(20,100),float CO2=random(20,100),String location="kitchen"){
  String json ="{\"humidity\":\"";
  json += String(humidity);
  json += "\",\"temperature\":\"";
  json += String(temperature);
  json += "\",\"pm25\":\"";
  json += String(pm25);
  json += "\",\"CO\":\"";
  json += String(CO);
  json += "\",\"CO2\":\"";
  json += String(CO2);
  json += "\",\"location\":\"";
  json += String(location);
  json += "\"}";
  return json;
}
void post(int timerDelay=3000){
  if ((millis() - lastTime) > timerDelay) {
  //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;      
      // Your Domain name with URL path or IP address with path
      http.begin(serverName);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(jsonToString());
      Serial.print(jsonToString());
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
float getTemperature(){
  return bme.readTemperature();
}

float getCO(){
  float R0 = 40.00;
  int sensorValue = analogRead(COpin);
  float sensorVolt = sensorValue/4096.0 * 3.3;
  float RSgas = (3.3-sensorVolt)/sensorVolt;
  float ratio =  RSgas/R0;
  float x = 1538.46 * ratio;
  float ppm=pow(x,-1.709);
  return ppm;
}

int getCO2(){
  return analogRead(CO2pin);
}
float getPressure(){
  return bme.readPressure() / 100.0F;
}

float getHumidity(){
  return bme.readHumidity();
}

void setup() {
  Serial.begin(115200);
//  bmeSetup();
  wifiSetup();
}


void loop() { 
  post();
  delay(delayTime);
}

void printValues() {
  Serial.print("Temperature = ");
  Serial.print(getTemperature());
  Serial.println(" *C");
  
  Serial.print("Pressure = ");
  Serial.print(getPressure());
  Serial.println(" hPa");

  Serial.print("Approx. Altitude = ");
  Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
  Serial.println(" m");

  Serial.print("Humidity = ");
  Serial.print(getHumidity());
  Serial.println(" %");

  Serial.print("CO = ");
  Serial.print(getCO());
  Serial.println(" %");


  Serial.print("CO2 = ");
  Serial.print(getCO2());
  Serial.println(" %");

  Serial.println();
}
