import React, { useState, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'
import { useData } from '../context/DataProvider'
import { useAnimations } from '../hooks/useAnimations'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useData()
  const navRef = useRef()
  const { magneticButton } = useAnimations(navRef)

  magneticButton('.magnetic')

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'SHOP', path: '/shop' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
    { name: 'CHAT', path: '/chat' }
  ]

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <nav ref={navRef} className="w-full px-6 lg:px-12 xl:px-16 py-6 flex items-center justify-between bg-transparent z-50 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center transition-opacity hover:opacity-80 z-50 magnetic">
        <div className="bg-[#fcebb6] text-[#3d2e1f] px-3 py-1.5 text-[11px] font-bold tracking-[0.2em]">
          ART SHINE
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 relative py-3 magnetic ${isActive ? 'text-[#3d2e1f]' : 'text-[#887a6d] hover:text-[#3d2e1f]'
              }`
            }
          >
            {({ isActive }) => (
              <span className="relative">
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#8b5a33] rounded-full"></span>
                )}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Desktop Action Button */}
      <div className="hidden lg:flex items-center justify-end gap-4 z-50">
        {user ? (
          <div className="relative group h-full flex items-center">
            <button className="bg-[#fcebb6] text-[#3d2e1f] hover:text-[#8b5a33] transition-colors p-3 rounded-full border border-transparent hover:border-[#8b5a33] flex items-center justify-center magnetic">
              <User size={20} strokeWidth={1.5} />
            </button>
            <div className="absolute top-[100%] right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 z-50">
              <div className="bg-[#fdfaf6] border border-[#e8dfd8] shadow-lg flex flex-col py-2 rounded-[2px]">
                <Link
                  to="/shop"
                  className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium text-[#3d2e1f] hover:text-[#8b5a33] hover:bg-[#f5e6d3] transition-colors"
                >
                  Shop
                </Link>
                <Link
                  to="/profile"
                  className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium text-[#3d2e1f] hover:text-[#8b5a33] hover:bg-[#f5e6d3] transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium text-[#3d2e1f] hover:text-[#8b5a33] hover:bg-[#f5e6d3] transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="border border-[#8b5a33] text-[#8b5a33] hover:bg-[#8b5a33] hover:text-white px-7 py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 rounded-[2px] min-h-[44px] flex items-center magnetic"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="lg:hidden text-[#3d2e1f] z-50 p-3 hover:opacity-70 transition-opacity flex items-center justify-center min-w-[44px] min-h-[44px] magnetic"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-[#fdfaf6] flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 lg:hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[10px] pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center justify-center gap-2 w-full pt-12">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-[15px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 w-full text-center py-4 ${isActive ? 'text-[#8b5a33]' : 'text-[#3d2e1f] hover:text-[#8b5a33]'
                }`
              }
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                opacity: isOpen ? 1 : 0,
                transition: 'all 0.4s ease-out'
              }}
            >
              {link.name}
            </NavLink>
          ))}

          <div
            className="flex flex-col items-center gap-4 mt-8 w-full px-8"
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 50}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 0.4s ease-out'
            }}
          >
            {user ? (
              <>
                {
                  user.role === "user" && (
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="w-full max-w-[240px] text-center bg-[#8b5a33] hover:bg-[#7a4e2c] text-white px-8 py-4 text-[12px] uppercase tracking-[0.2em] font-bold rounded-sm transition-all shadow-md active:scale-95"
                    >
                      Profile
                    </Link>
                  )
                }
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full max-w-[240px] text-center border border-[#8b5a33] text-[#8b5a33] hover:bg-[#fdfaf6] px-8 py-4 text-[12px] uppercase tracking-[0.2em] font-bold rounded-sm transition-all active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-[240px] text-center bg-[#8b5a33] text-white hover:bg-[#7a4e2c] px-8 py-4 text-[12px] uppercase tracking-[0.2em] font-bold rounded-sm transition-all shadow-md active:scale-95"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar