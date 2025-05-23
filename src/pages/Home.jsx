import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'

const Home = ({ darkMode, setDarkMode }) => {
  const [watchlist, setWatchlist] = useState([])
  const [currentVideo, setCurrentVideo] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")

  // Mock content data
  const [content] = useState([
    {
      id: 1,
      title: "Cyberpunk Chronicles",
      genre: ["Sci-Fi", "Action"],
      year: 2024,
      rating: "8.9",
      duration: "2h 15m",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "In a dystopian future, a hacker discovers the truth about reality itself."
    },
    {
      id: 2,
      title: "Ocean's Mystery",
      genre: ["Drama", "Mystery"],
      year: 2023,
      rating: "9.2",
      duration: "1h 58m",
      thumbnail: "https://images.unsplash.com/photo-1544966503-7e9518d0c72d?w=400&h=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "A deep-sea explorer uncovers ancient secrets beneath the waves."
    },
    {
      id: 3,
      title: "Urban Legends",
      genre: ["Horror", "Thriller"],
      year: 2024,
      rating: "7.8",
      duration: "1h 42m",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "When city myths become reality, terror stalks the streets."
    },
    {
      id: 4,
      title: "Space Odyssey",
      genre: ["Sci-Fi", "Adventure"],
      year: 2023,
      rating: "9.5",
      duration: "2h 28m",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "Humanity's greatest journey to the stars begins with a single step."
    },
    {
      id: 5,
      title: "Mountain Rescue",
      genre: ["Action", "Drama"],
      year: 2024,
      rating: "8.1",
      duration: "1h 56m",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "When disaster strikes in the mountains, heroes emerge from the snow."
    },
    {
      id: 6,
      title: "Digital Dreams",
      genre: ["Comedy", "Romance"],
      year: 2023,
      rating: "7.9",
      duration: "1h 34m",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description: "Love finds a way in the most unexpected digital places."
    }
  ])

  const genres = ["All", "Sci-Fi", "Action", "Drama", "Mystery", "Horror", "Thriller", "Adventure", "Comedy", "Romance"]

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "All" || item.genre.includes(selectedGenre)
    return matchesSearch && matchesGenre
  })

  const addToWatchlist = (contentItem) => {
    if (!watchlist.find(item => item.id === contentItem.id)) {
      setWatchlist([...watchlist, contentItem])
      toast.success(`"${contentItem.title}" added to watchlist!`)
    } else {
      toast.info("Already in your watchlist")
    }
  }

  const removeFromWatchlist = (contentId) => {
    const item = watchlist.find(item => item.id === contentId)
    setWatchlist(watchlist.filter(item => item.id !== contentId))
    toast.success(`"${item.title}" removed from watchlist`)
  }

  const playVideo = (contentItem) => {
    setCurrentVideo(contentItem)
    toast.success(`Now playing: "${contentItem.title}"`)
  }

  const closeVideo = () => {
    setCurrentVideo(null)
  }

  const featuredContent = content[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-dark via-secondary to-secondary-light">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-surface-800"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-primary">StreamVault</h1>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search movies and shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-800 rounded-lg border border-surface-700 focus:border-primary focus:outline-none text-white placeholder-surface-400"
                />
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${featuredContent.thumbnail})`,
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent"
            >
              {featuredContent.title}
            </motion.h2>
            
            <motion.p 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-surface-300 mb-6 leading-relaxed"
            >
              {featuredContent.description}
            </motion.p>
            
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => playVideo(featuredContent)}
                className="btn-primary flex items-center gap-2 justify-center"
              >
                <ApperIcon name="Play" className="w-5 h-5" />
                Play Now
              </button>
              
              <button
                onClick={() => addToWatchlist(featuredContent)}
                className="btn-secondary flex items-center gap-2 justify-center"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                Add to Watchlist
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Genre Filter */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-primary text-white shadow-glow'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
        >
          <AnimatePresence>
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className="content-card"
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
                    <p className="text-xs text-surface-300 mb-2">{item.year} • {item.rating} ⭐</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          playVideo(item)
                        }}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white text-xs py-1 px-2 rounded flex items-center justify-center gap-1"
                      >
                        <ApperIcon name="Play" className="w-3 h-3" />
                        Play
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToWatchlist(item)
                        }}
                        className="bg-surface-700 hover:bg-surface-600 text-white text-xs py-1 px-2 rounded"
                      >
                        <ApperIcon name="Plus" className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Main Feature Component */}
        <MainFeature 
          watchlist={watchlist}
          removeFromWatchlist={removeFromWatchlist}
          playVideo={playVideo}
        />
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {currentVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={currentVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
              
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold mb-2">{currentVideo.title}</h3>
                <p className="text-surface-300 text-sm">{currentVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home