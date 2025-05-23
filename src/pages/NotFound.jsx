import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary-light to-secondary-dark flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertTriangle" className="w-16 h-16 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-primary mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold text-white mb-4"
        >
          Content Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-surface-300 text-lg mb-8 max-w-md mx-auto"
        >
          Looks like this content has vanished into the digital void. Let's get you back to streaming!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-2 justify-center"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-2 text-surface-400">
            <ApperIcon name="Play" className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">StreamVault</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound