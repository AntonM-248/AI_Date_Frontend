import { useState } from 'react'
import './App.css'
import {User, MessageCircle, Heart, X} from 'lucide-react';

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

const MatchesList = () => (
  <div className="rounded-lg shadow-lg p-4">
    <h2 className="text-2xl font-bold mb-4">Matches</h2>
    <ul>
      {[
        {id: 1, firstName: 'Chloe', lastName: 'Moretz', imageUrl: 'https://cdn.pixabay.com/photo/2023/10/12/23/58/woman-8311928_1280.jpg'},
        {id: 1, firstName: 'Grace', lastName: 'Lorenz', imageUrl: 'https://i.pinimg.com/736x/01/23/e7/0123e789518244f2282f0fb00e3871fb.jpg'}
      ].map(match => (
        <li key={match.id} className="mb-2">
          <button className="w-full hover:bg-gray-100 rounded  flex item-center">
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

function App() {
  return (
    <>
      <div className="w-full max-w-lg mx-auto p-9">
        <nav className="flex justify-between mx-2 my-2 mb-4">
          <User />
          <MessageCircle />
        </nav>
        <ProfileSelector />
        {/* <MatchesList /> */}
      </div>
    </>
  )
}

export default App
