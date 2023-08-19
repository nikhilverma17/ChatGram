import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
      <footer>
        <p class="footer"><i class="icon fa-solid fa-copyright fa-lg"></i> 2023 Nikhil Verma. All rights reserved.</p>
        <div class="footer">
          <a href="https://github.com/nikhilverma17" target="_blank"><i
            class="icon1 fa-brands fa-github  fa-lg"></i></a>
          <a href="mailto:iamvermanikhil@gmail.com" target="_blank"><i
            class="icon1 fa-solid fa-envelope fa-lg"></i></a>
          <a href="https://www.linkedin.com/in/nihkil-verma-465848139/" target="_blank"><i
            class="icon1 fa-brands fa-linkedin fa-lg"></i></a>
          <a href="https://twitter.com/thenikhil_verma" target="_blank"><i
            class="icon1 fa-brands fa-twitter fa-lg"></i></a>
          <a href="https://www.instagram.com/thevermanikhil/" target="_blank"><i
            class="icon1 fa-brands fa-instagram fa-lg"></i></a>
        </div>
      </footer>

    </div>
  )
}

export default Home