import  ForumIcon from '@material-ui/icons/Forum';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { selectRoomId } from '../features/counter/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from '../firebase';
import Message from './Message';



function Chat() {

    const chatRef = useRef(null); 
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    );
    const [roomMessages, loading] = useCollection(
        roomId && db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp","asc")
    );

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
        });
    }, [roomId, loading]);

    return (
    <ChatContainer>

        {roomDetails && roomMessages ?
          <> 
          <Header>
              <HeaderLeft>
              <h4>
              <strong>#{roomDetails?.data().name}</strong>
              <ForumIcon />
              </h4>
              </HeaderLeft>
              <HeaderRight>
              <p>
              <InfoOutlinedIcon /> Details
              </p>
              </HeaderRight>
          </Header>

          <ChatMessages>
              {roomMessages?.docs.map(doc => {
                  const { message, timestamp, user, userImage } = doc.data();

                  return (
                      <Message
                          key={doc.id}
                          message={message}
                          timestamp={timestamp}
                          user={user}
                          userImage={userImage}
                      />
                  )
              })}
              
          
              <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput 
              chatRef={chatRef}
              channelName={roomDetails?.data().name} 
              channelId={roomId}            
          />
          </> : <h4>Join a channel or add your own!</h4>
        }
        
    </ChatContainer>
    );
}

export default Chat;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 23px;
  border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div`

`;


const HeaderLeft = styled.div`
  display: flex;
  align-items: center;  

  > h4 {
    display: flex;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
    margin-top: 5px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;

    >h4 {
    margin-top: 25px;
    font-size: 21px;
    text-align: center;

    -webkit-animation: slidein 4s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: slidein 4s; /* Firefox < 16 */
        -ms-animation: slidein 4s; /* Internet Explorer */
         -o-animation: slidein 4s; /* Opera < 12.1 */
            animation: slidein 4s;
    @keyframes slidein {
    from { opacity: 0; }
    to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes slidein {
    from { opacity: 0; }
    to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes slidein {
    from { opacity: 0; }
    to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes slidein {
    from { opacity: 0; }
    to   { opacity: 1; }
    }   

    }   
`;
