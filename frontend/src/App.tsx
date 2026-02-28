import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { TerminalLayout } from './components/TerminalLayout'

function App() {

  return (
    <TerminalLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </TerminalLayout>
  )
}

export default App;
