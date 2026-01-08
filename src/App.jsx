import { useState, useEffect } from 'react'
import './App.css'
import {User, MessageCircle, Heart, X} from 'lucide-react';
import {fetchRandomProfile, saveSwipe, fetchMatches, fetchConversation, sendMessage} from './Api.jsx'

const ProfileSelector = ({profile, onSwipe}) => (
  profile ? (
    <div className="rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="relative">
        <img src={'http://localhost:8080/images/' + profile.imageUrl}/>
        <div className="absolute bottom-0 left-0 right-0 text-white 
            p-4 bg-gradient-to-t from-black">
          <h2 className="text-3x1 font-bold">{profile.firstName} {profile.lastName}, {profile.age}</h2>

        </div>
      </div>
      <div className="p-4">
          <p className="text-gray-600 mb-">{profile.bio}</p>
        </div>
        <div className="p-4 flex justify-center space-x-4">
          <button className="bg-red-500 rounded-full p-4 text-white hover:bg-red-900"
              onClick={() => onSwipe(profile.id, "left")}>
            <X size={24} />
          </button>
          <button className="bg-green-500 rounded-full p-4 text-white hover:bg-green-700"
              onClick={() => onSwipe(profile.id, "right")}>
            <Heart size={24} />
          </button>
        </div>
    </div>
  ) : <div>Loading...</div>
);

const MatchesList = ({ matches, onSelectMatch }) => {
  return ( 
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Matches</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index} className="mb-2">
            <button 
              className="w-full hover:bg-gray-100 rounded  flex item-center"
              onClick={() => onSelectMatch(match.profile, match.conversationId)}>
              <img src={'http://localhost:8080/images/' + match.profile.imageUrl} className="w-16 h-16 rounded-full mr-3" />
              <span>
                <h3 className="font-bold">{match.profile.firstName} {match.profile.lastName}</h3>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};

const ChatScreen = ({currentMatch, conversation, refreshChatState}) => {
  const [input, setInput] = useState("");

  const handleSend = async (conversationId, input) => {
    if(input.trim()){
      console.log(conversationId)
      await sendMessage(conversationId, input);
      refreshChatState();
    }
  }

  return currentMatch ? (
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with {currentMatch.firstName} {currentMatch.lastName}</h2>
      <div className="h-[25vh] border border-gray-200 rounded overflow-y-auto mb-4 p-2">
        {
          conversation.messages.map((message, index) =>  (
            <div key={index}>
              <div className="mb-4 p-2 rounded bg-gray-100">{message.messageText}</div>
            </div>
          )) 
        }
      </div>
      <div className="flex">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border flex-1 rounded p-2 mr-2"
          placeholder="Type a message..."
        />
        <button 
          className="bg-blue-500 text-white rounded p-2"
          onClick={() => handleSend(conversation.id, input, setInput)}
        >Send</button>
      </div>
    </div>
  ) : <div>Loading current match...</div>
}

function App() {
  

  const [currentScreen, setCurrentScreen] = useState('profile');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [currentMatchAndConversation, setCurrentMatchAndConversation] = useState({ match: {}, conversation: []})

  
  const onSwipe = async (profileId, direction) => {
    if(direction === 'right') {
      await saveSwipe(profileId);
      await loadMatches();
    }
    loadRandomProfile();
  }

  const onSelectMatch = async (profile, conversationId) => {
    const conversation = await fetchConversation(conversationId);
    console.log(conversation);
    setCurrentMatchAndConversation({match: profile, conversation: conversation});
    setCurrentScreen('chat');
  }

  const loadRandomProfile = async () => {
    try {
      const profile = await fetchRandomProfile();
      setCurrentProfile(profile);
    } catch (error) {
      console.log(error);
    }
  }

  const loadMatches = async () => {
    try {
      const matches = await fetchMatches();
      setMatches(matches);
    } catch (error) {
      console.error(error);
    }
  }

  const refreshChatState = async() => {
    const conversation = await fetchConversation(currentMatchAndConversation.conversation.id);
    setCurrentMatchAndConversation({match: currentMatchAndConversation.match, 
        conversation: conversation});
  }

  useEffect(() => {
    loadRandomProfile();
    loadMatches();
  }, [])

  const renderScreen = () => 
    {switch (currentScreen) {
      case 'profile':
        return <ProfileSelector profile={currentProfile} onSwipe={onSwipe}/>;
      case 'matches':
        return <MatchesList matches={matches} onSelectMatch={onSelectMatch}/>;
      case 'chat':
        return <ChatScreen 
            currentMatch={currentMatchAndConversation.match} 
            conversation={currentMatchAndConversation.conversation}
            refreshChatState={refreshChatState}/>;
      default:
        break;
    }
  }
  return (
    <>
      <div className="w-full max-w-lg mx-auto p-9">
        <nav className="flex justify-between mx-2 my-2 mb-4">
          <User onClick={() => setCurrentScreen("profile")}/>
          <MessageCircle onClick={() => setCurrentScreen("matches")}/>
        </nav>
        {renderScreen()}
          
      </div>
    </>
  )
}

export default App
