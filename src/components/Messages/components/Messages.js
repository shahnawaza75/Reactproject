import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import '../styles/_messages.scss';
import initialBottyMessage from '../../../common/constants/initialBottyMessage';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);

  // logic for butty msg
  const [Typing, setTyping] = useState(true)
  const [message, setMessage] = useState('')
  const [MessageSent, setMessageSent] = useState([])

  const onChangeMessage = (values) => {
    values.preventDefault();
    const bottyMessage = values.target.value
    setMessage(bottyMessage)
    
  }
  
  const sendMessage = (values) => {
    setMessageSent(MessageSent => [...MessageSent, message]);
    setMessage('')
    
  }


  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        <div className="messages__message">{initialBottyMessage}</div>
        <div className="messages__message--me">{MessageSent}</div>
       
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage}/>
    </div>
  );
}

export default Messages;
