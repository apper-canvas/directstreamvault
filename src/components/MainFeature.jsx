import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ watchlist, removeFromWatchlist, playVideo }) => {
  const [activeTab, setActiveTab] = useState('watchlist')
  const [sortBy, setSortBy] = useState('dateAdded')
  const [filterGenre, setFilterGenre] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique genres from watchlist
  const genres = ['All', ...new Set(watchlist.flatMap(item => item.genre))]

  // Filter and sort watchlist
  const filteredWatchlist = watchlist
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = filterGenre === 'All' || item.genre.includes(filterGenre)
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'year':
          return b.year - a.year
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating)
        default:
          return 0
      }
    })

  const handleRemoveWithConfirmation = (item) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>Remove "{item.title}" from watchlist?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              removeFromWatchlist(item.id)
              toast.dismiss()
            }}
            className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-sm"
          >
            Remove
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-surface-600 hover:bg-surface-500 text-white px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-surface-800 border border-surface-700'
      }
    )
  }

  const clearWatchlist = () => {
    if (watchlist.length === 0) return

    toast.info(
      <div className="flex flex-col gap-2">
        <p>Clear entire watchlist? This cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              watchlist.forEach(item => removeFromWatchlist(item.id))
              toast.dismiss()
              toast.success("Watchlist cleared!")
            }}
            className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-sm"
          >
            Clear All
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-surface-600 hover:bg-surface-500 text-white px-3 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-surface-800 border border-surface-700'
      }
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-6 md:p-8 mb-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
            <ApperIcon name="BookmarkCheck" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">My Watchlist</h2>
            <p className="text-surface-300">Manage your saved content</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-surface-400">{filteredWatchlist.length} items</span>
          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="text-primary hover:text-primary-light text-sm flex items-center gap-1 transition-colors"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 lg:max-w-xs">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search watchlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-800/50 rounded-lg border border-surface-700 focus:border-primary focus:outline-none text-white placeholder-surface-400 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="bg-surface-800/50 border border-surface-700 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-800/50 border border-surface-700 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
          >
            <option value="dateAdded">Date Added</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>

          <div className="flex rounded-lg border border-surface-700 overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-800/50 text-surface-400 hover:text-white'
              }`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-800/50 text-surface-400 hover:text-white'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filteredWatchlist.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="BookmarkX" className="w-10 h-10 text-surface-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || filterGenre !== 'All' ? 'No matches found' : 'Your watchlist is empty'}
            </h3>
            <p className="text-surface-400">
              {searchTerm || filterGenre !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Add movies and shows to watch them later'
              }
            </p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filteredWatchlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-surface-800">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleRemoveWithConfirmation(item)}
                      className="bg-black/50 hover:bg-primary text-white p-1.5 rounded-full transition-colors"
                    >
                      <ApperIcon name="X" className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-medium text-sm mb-1 truncate text-white">{item.title}</h4>
                    <p className="text-xs text-surface-300 mb-2">{item.year} • {item.rating} ⭐</p>
                    
                    <button
                      onClick={() => playVideo(item)}
                      className="w-full bg-primary hover:bg-primary-dark text-white text-xs py-1.5 rounded flex items-center justify-center gap-1 transition-colors"
                    >
                      <ApperIcon name="Play" className="w-3 h-3" />
                      Play
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {filteredWatchlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-4 p-4 bg-surface-800/30 rounded-lg hover:bg-surface-800/50 transition-colors"
              >
                <div className="w-16 h-24 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{item.title}</h4>
                  <p className="text-sm text-surface-300">{item.year} • {item.duration}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ApperIcon name="Star" className="w-4 h-4 text-accent fill-current" />
                    <span className="text-sm text-surface-300">{item.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.genre.slice(0, 2).map(genre => (
                      <span key={genre} className="text-xs bg-surface-700 text-surface-300 px-2 py-1 rounded">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playVideo(item)}
                    className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Play" className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleRemoveWithConfirmation(item)}
                    className="bg-surface-700 hover:bg-primary text-surface-300 hover:text-white p-2 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default MainFeature