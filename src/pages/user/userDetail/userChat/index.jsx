import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { getHistory, getUser, listUser } from '../../../../services/userService';
import { notification } from 'antd';

export default function UserChat() {
  const [messageInput, setMessageInput] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [listUserData, setListUserData] = useState([])
  const [currentUserId, setCurrentUserId] = useState(0);
  const [otherUserId, setOtherUserId] = useState(0);
  const [incomingMessageCounts, setIncomingMessageCounts] = useState({});
  const [messages, setMessages] = useState({});
  const [usernames, setUsernames] = useState({});
  const [listChatHistory, setListChatHistory] = useState([])
  // Lấy ra toàn bộ user
  const loadingUserData = async () =>{
    const data = await listUser();
    const users = data.data.data;
    setListUserData(users)
    // lấy ra toàn bộ tên của user rồi cho vào object usernamesMap với key là userid và value là username rồi updateState setUsernames
    // để khi mở màn hình chat biết là tin nhắn do ai gửi
    const usernamesMap = {};
    users.forEach((user) => {
      usernamesMap[user.id] = user.username;
    });
    setUsernames(usernamesMap);
  } 
  // Lấy ra user đang đăng nhập và update State CurrentUserId
  const loadingUserLogin = async () =>{
      const data = await getUser();
      setCurrentUserId(data.data.data.id)
  }
  // Chạy khi ấn vào ảnh của user muốn chat
  // tham số: id là id của user muốn chat, currentId là otherUserId cũ
  const chatWith =  (id,currentId) => {
    setOtherUserId(id);
    // lấy ra lịch sử chat giữa user đang đăng nhập và user muốn chat
    getHistoryChat(id);
    setIncomingMessageCounts((prevCounts) => ({
      ...prevCounts,
      [id]: 0, // Đặt lại số tin nhắn gửi đến về 0
    }));
    if(currentId != 0){
      setIncomingMessageCounts((prevCounts) => ({
        ...prevCounts,
        [currentId]: 0, // Đặt lại số tin nhắn gửi đến về 0
      }));
      // getUsername(id);
    }
  
  };
  useEffect(()=>{
    // xóa đi tin nhắn nhận được khi lắng nghe từ subcribe
    setMessages((prevMessages) => ({
      ...prevMessages,
      [createConversationId(currentUserId,otherUserId)]: [],
    }));
  },[listChatHistory])
  // Lấy lịch sử chat
  const getHistoryChat = async(id) =>{
    try{
      const data = await getHistory(id);
      setListChatHistory(data.data.data)
      console.log(
        "data",data.data.data);
      
    }catch(error){
      notification.error({
        message: error.response.data.data
      })
    }
  }
  useEffect(()=>{
    loadingUserLogin();
    loadingUserData();
  },[])
  useEffect(() => {
    // Tạo kết nối WebSocket
    const socket = new SockJS('http://localhost:8080/chat-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      onConnect: () => {
        console.log('Connected to WebSocket');
        setIsConnected(true); // Đánh dấu là đã kết nối
        setStompClient(client); // Lưu client vào state
        console.log("WebSocket connected:", isConnected);
      
        
        // Đăng ký kênh lắng nghe tin nhắn
        client.subscribe(`/user/${currentUserId}/chat/messages`, (messageOutput) => {
          // messageOutput là dữ liệu từ controller gửi qua 
          const message = JSON.parse(messageOutput.body);
          const senderId = message.senderId;
           // Cập nhật số lượng tin nhắn nhận được từ từng người gửi
          setIncomingMessageCounts((prevCounts) => ({
            ...prevCounts,
            [senderId]: (prevCounts[senderId] || 0) + 1,
          }));
          // tạo ra 1 key riêng biệt giữa người gửi với người nhận
          const conversationId = createConversationId(currentUserId, message.senderId === currentUserId ? message.recipientId : message.senderId);
          setMessages((prevMessages) => ({
            ...prevMessages,
            [conversationId]: [...(prevMessages[conversationId] || []), message],
          }));
        });
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setIsConnected(false); // Đánh dấu là ngắt kết nối
      }
    });

    // Kích hoạt kết nối WebSocket
    client.activate();

    return () => {
      client.deactivate(); // Đảm bảo đóng kết nối khi component bị hủy
    };
  }, [currentUserId]);

  const createConversationId = (userId1, userId2) =>
    userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;
  const sendMessage = () => {
    // comment cái if dưới này nếu muốn debug trong intelliJ 
    if (!stompClient || !stompClient.connected) {
        console.log("STOMP client is not connected yet!");
        return;
    }
    // Kiểm tra nếu đã kết nối và nội dung tin nhắn không rỗng
    if (messageInput.trim() && stompClient && isConnected) {
      const chatMessage = {
        senderId: currentUserId,
        recipientId: otherUserId,
        content: messageInput,
        timestamp: new Date().toISOString(),
      };
      // Sử dụng stompClient để gửi tin nhắn
      stompClient.publish({
        // vì WebSocketConfig bên intell bắt phải có tiền tố là app nên đường dẫn đến controller phải có app ở trước. Nó sẽ chạy thẳng đến @MessageMapping("/chat")
        destination: `/app/chat`,
        body: JSON.stringify(chatMessage),
      });
      setMessageInput(''); // Xóa ô nhập liệu sau khi gửi
      
    } else {
      console.log("STOMP client is not connected or message is empty.");
    }
  };
  // const currentConversationId = createConversationId(currentUserId, otherUserId);
  // setConverst(currentConversationId);
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>User Chat</h2>
      <div className='flex'> 
        {/* Lặp toàn bộ user nếu user và kiểm tra xem ở trong incomingMessageCounts có key nào = với item.id không.
            Nếu có thì sẽ lấy ra giá trị của incomingMessageCounts còn không có thì sẽ lấy 0 */}
      {listUserData.map(item => {
      const messageCount = incomingMessageCounts[item.id] || 0; // Đếm số lượng tin nhắn từ người này
      
      return (
        <div key={item.id}>
          <img 
            src={item.image} 
            width={50} 
            className='ml-2 cursor-pointer' 
            onClick={() => chatWith(item.id,otherUserId)}
          />
          <p className='ml-2'>{item.username}</p>
          {/* Khi mình ấn vào ảnh thì sẽ chạy hàm chatwith để set otherUserId để biết mình nhắn với ai.
          Nếu như otherUserId trùng với item này thì có nghĩa là mình đang ở màn hình chat với người này nên sẽ không hiện số tin nhắn mà người này gửi đến */}
          {messageCount > 0 && otherUserId != item.id && currentUserId != item.id && ( // Hiển thị số tin nhắn nếu có
            <span className="text-xs text-white ml-1 border rounded-full px-2 py-1 bg-red-500">{messageCount}</span>
          )}
        </div>
      );
    })}           
      </div>
      <h2>Chat with {otherUserId}</h2>
     
      <div style={{ border: '1px solid #ddd', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {/* Hiển thị lịch sử chat */}
        {
          listChatHistory.map((item,index) => (
            <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: item.senderId === currentUserId ? 'flex-end' : 'flex-start',
              margin: '10px 0',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: item.senderId === currentUserId ? '#e1ffc7' : '#f1f1f1',
                textAlign: 'left',
              }}
            >
              <strong>{item.senderId === currentUserId ? '' : usernames[item.senderId] ? `${usernames[item.senderId]}:`: 'Loading...'} </strong> {item.content}
            </div>
          </div>
          )   
          )
        }
        {/* Hiển thị tin nhắn mình nhận được khi lắng nghe từ subcribe */}
      {(messages[createConversationId(currentUserId, otherUserId)] || []).map((msg, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
            margin: '10px 0',
          }}
        >
          <div
            style={{
              maxWidth: '70%',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: msg.senderId === currentUserId ? '#e1ffc7' : '#f1f1f1',
              textAlign: 'left',
            }}
          >
            <strong>{msg.senderId === currentUserId ? '' : usernames[msg.senderId] ? `${usernames[msg.senderId]}:`: 'Loading...'} </strong> {msg.content}
          </div>
        </div>
      ))}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: "1", padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
      </div>
    </div>
  );
}