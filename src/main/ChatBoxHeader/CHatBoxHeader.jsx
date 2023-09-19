import React from 'react'
import Search from '../Search/Search';
import ChatBox from '../components/ChatBox';
import Notifications from '../Chat/notifications/Notifications';
import ChatboxBody from '../ChatboxBody/ChatboxBody';

export default function CHatBoxHeader(props) {
    console.log(props.opt);
    var tag = <ChatboxBody />
    if(props.opt===1){
        tag = <ChatboxBody />
    }else if(props.opt===2){
        tag = <Search />
    }else{
        tag = <Notifications />
    }

    return (
        <>{tag}</>
    );
}
