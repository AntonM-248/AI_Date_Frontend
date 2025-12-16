import { useState, useEffect } from 'react'
import './App.css'
import {User, MessageCircle, Heart, X} from 'lucide-react';
import {fetchRandomProfile} from './Api.jsx'

const ProfileSelector = () => (
  <div className="rounded-lg overflow-hidden bg-white shadow-lg">
    <div className="relative">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMjEzMjA0ODk1OF5BMl5BanBnXkFtZTcwMTA4ODM3OQ%40%40._V1_FMjpg_UX1000_.jpg&f=1&nofb=1&ipt=02d29e58eaf9a1b227fad068b6c0116cfa25497aa7a6a9034c7d49d278d0ad44"/>
      <div className="absolute bottom-0 left-0 right-0 text-white 
          p-4 bg-gradient-to-t from-black">
        <h2 className="text-3x1 font-bold">Foo bar, 30</h2>

      </div>
    </div>
    <div className="p-4">
        <p className="text-gray-600 mb-">Actress, business owner, runner, crafter.</p>
      </div>
      <div className="p-4 flex justify-center space-x-4">
        <button className="bg-red-500 rounded-full p-4 text-white hover:bg-red-900"
            onClick={() => console.log("left")}>
          <X size={24} />
        </button>
        <button className="bg-green-500 rounded-full p-4 text-white hover:bg-green-700"
            onClick={() => console.log("right")}>
          <Heart size={24} />
        </button>
      </div>
  </div>
);

const MatchesList = ({ onSelectMatch }) => (
  <div className="rounded-lg shadow-lg p-4">
    <h2 className="text-2xl font-bold mb-4">Matches</h2>
    <ul>
      {[
        {id: 1, firstName: 'Chloe', lastName: 'Moretz', imageUrl: 'https://cdn.pixabay.com/photo/2023/10/12/23/58/woman-8311928_1280.jpg'},
        {id: 1, firstName: 'Grace', lastName: 'Lorenz', imageUrl: 'https://i.pinimg.com/736x/01/23/e7/0123e789518244f2282f0fb00e3871fb.jpg'}
      ].map(match => (
        <li key={match.id} className="mb-2">
          <button 
            className="w-full hover:bg-gray-100 rounded  flex item-center"
            onClick={onSelectMatch}>
            <img src={match.imageUrl} className="w-16 h-16 rounded-full mr-3" />
            <span>
              <h3 className="font-bold">{match.firstName} {match.lastName}</h3>
            </span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const ChatScreen = () => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if(input.trim()){
    console.log(input);
    setInput("");
    }
  }

  return(
    <div className="rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with Foo Bar</h2>
      <div className="h-[25vh] border border-gray-200 rounded overflow-y-auto mb-4 p-2">
        {
          [
            "hi",
            "I'm bob",
            "I'm sharon",
            "Let's get coffee",
            "Sure thing",
            "How about Friday",
            "That works"
          ].map((message, index) =>  (
            <div key={index}>
              <div className="mb-4 p-2 rounded bg-gray-100">{message}</div>
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
          onClick={handleSend}
        >Send</button>
      </div>
    </div>
  )
}

function App() {
  const loadRandomProfile = async () => {
    try {
      const profile = await fetchRandomProfile();
      setCurrentProfile(profile);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadRandomProfile();
  })

  const [currentScreen, setCurrentScreen] = useState('matches');
  const [currentProfile, setCurrentProfile] = useState(null);

  const renderScreen = () => 
    {switch (currentScreen) {
      case 'profile':
        return <ProfileSelector />;
      case 'matches':
        return <MatchesList onSelectMatch={() => setCurrentScreen("chat")}/>;
      case 'chat':
        return <ChatScreen />;
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
