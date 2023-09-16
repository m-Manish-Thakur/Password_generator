import { useCallback, useRef, useState, useEffect } from 'react';
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [number, setNumberAllow] = useState(false);
  const [char, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');
  
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number){
      str+="0123456789";
    }
    if(char){
      str += "!@#$%^*~";
    }
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, char, number])

  useEffect(()=>{
    passwordGenerator();  
  }, [length, char, number, passwordGenerator])


  // useRef hook
  const passwordRef = useRef(null)

  const copyPassword = useCallback(()=>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
        <h1 className='text-4xl text-center mt-8 font-bold text-white'>Password Generator</h1>
        <div className='bg-slate-700 p-5 border-2 border-gray-500 rounded-lg mx-auto mt-10' style={{width:'550px'}}>
        <div className='flex justify-center'>
          <input  type="text"
                  className="block w-4/5 rounded-md border-0 py-1.5 pl-7 pr-20 text-orange-600 font-semibold  placeholder:text-gray-400 focus:ring-2 focus:ring-inse"
                  placeholder="Password"
                  value={password}
                  ref={passwordRef}
                  readOnly
          />
          <button 
              onClick={copyPassword()}
              type="submit" className="flex w-1/5 ml-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Copy
          </button>
        </div>

        <div className='flex items-center gap-x-2 mt-5'>
          <input 
              type="range" 
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{setLength(e.target.value)}}
            />
          <label className='text-gray-300'>Length: {length}</label>

          <input 
              type="checkbox" 
              defaultChecked={number}
              className="cursor-pointer ml-10"
              onChange={(e)=>{setNumberAllow((prev)=> !prev)}}
            />
          <label className='text-gray-300'>Numbers</label>

          <input 
              type="checkbox" 
              defaultChecked={number}
              className="cursor-pointer ml-10"
              onChange={(e)=>{setCharAllow((prev)=> !prev)}}
            />
          <label className='text-gray-300'>Characters</label>

        </div>
    
        </div>
    </>
  )
}

export default App
