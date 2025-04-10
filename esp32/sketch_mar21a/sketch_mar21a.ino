#include "MusicalNotes.h"
#include "FeatherShieldESP32Pinouts.h"

#include <ArduinoJson.h>

#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>

#define SPEAKER A1

int EFFECT=1;
int PITCH=0;
int VOLUME=0;
int WAVE=0;
int playing_c=0;
int playing_d=0;
int playing_e=0;
int playing_f=0;
int playing_g=0;
int playing_a=0;
int playing_b=0;

void pinInit(){
  pinMode(A2,INPUT);
  pinMode(A3,INPUT);
  pinMode(TX,INPUT);
  pinMode(RX,INPUT);
  pinMode(A4,INPUT);
  pinMode(D5,INPUT);
  pinMode(D3,INPUT);
  pinMode(SPEAKER,OUTPUT);
  digitalWrite(SPEAKER,LOW);
}

WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

#define USE_SERIAL Serial1

StaticJsonDocument<200> doc;