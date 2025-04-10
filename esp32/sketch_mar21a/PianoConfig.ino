void updatePlayingNote(){
  playing_c = digitalRead(A3);
  playing_d = digitalRead(A2);

  playing_e = digitalRead(TX);
  playing_f = digitalRead(RX);

  playing_g = digitalRead(A4);
  playing_a = digitalRead(D5);

  playing_b = digitalRead(D3);
}

void handleNotePlayback(){
  if(playing_c!=0){
    Serial.println("playing C note: ");
    Serial.println(C_NOTE);

    playNote(C_NOTE,EFFECT);
    //sendMessageToServer();
  }
  if(playing_d!=0){
    Serial.println("playing D note: ");
    Serial.println(D_NOTE);

    playNote(D_NOTE,EFFECT);
  }
  if(playing_e!=0){
    Serial.println("playing E note: ");
    Serial.println(E_NOTE);

    playNote(E_NOTE,EFFECT);
  }
  if(playing_f!=0){
    Serial.println("playing F note: ");
    Serial.println(F_NOTE);

    playNote(F_NOTE,EFFECT);
  }
  if(playing_g!=0){
    Serial.println("playing G note: ");
    Serial.println(G_NOTE);

    playNote(G_NOTE,EFFECT);
  }
  if(playing_a!=0){
    Serial.println("playing A note: ");
    Serial.println(A_NOTE);

    playNote(A_NOTE,EFFECT);
  }
  if(playing_b!=0){
    Serial.println("playing B note: ");
    Serial.println(B_NOTE);

    playNote(B_NOTE,EFFECT);
  }
}

void updatePitch(){
  PITCH = (analogRead(A0)*130)/4095;

  if(PITCH>40){
    Serial.print("Pitch: ");
    Serial.println(PITCH);
  }else{
    PITCH=0;
  }
}

void playNote(int music_note, int effect){
  int frequence=(music_note+PITCH);

  switch(effect) {
		case 0: //no effect
			tone(SPEAKER, frequence*1, 30);
		break;
    case 1: //octaver
			tone(SPEAKER, frequence*1, 30);
      delay(40);
      tone(SPEAKER, frequence*3, 30);
      delay(40);
      tone(SPEAKER, frequence*5, 30);
		break;
    case 2: //arpeggio
			tone(SPEAKER, frequence*1, 30);
      delay(40);
      tone(SPEAKER, frequence*2, 30);
      delay(40);
      tone(SPEAKER, frequence*3, 30);
      delay(40);
      tone(SPEAKER, frequence*4, 30);
      delay(40);
      tone(SPEAKER, frequence*3, 30);
      delay(40);
      tone(SPEAKER, frequence*2, 30);
      delay(40);
      tone(SPEAKER, frequence*1, 30);
      delay(40);
		break;
	}
}