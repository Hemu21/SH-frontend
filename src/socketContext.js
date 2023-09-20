import React, { createContext, useState, useRef, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const Server = process.env.SERVER || "https://sh-server.onrender.com"

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io(Server);

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [enter,setEnter] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if(enter){
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
        console.info("myyyy")
        console.info(currentStream)
      });

    ;}
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      console.info("callling.................")
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    })
    
  }, [enter]);
  useMemo(()=>{
    socket.on('me', (id) => setMe(id));
  },[])

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });
    console.info("streaming. connnnn")
    peer.on('stream', (currentStream) => {
      console.info("ursss")
      console.info(currentStream)
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    setEnter(true)
    const peer = new Peer({ initiator: true, trickle: false, stream });
    
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    setEnter(false)
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      enter,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
