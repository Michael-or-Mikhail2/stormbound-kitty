import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Only from '../Only'
import load from '../../helpers/load'
import './index.css'

const SearchDialog = load('SearchDialog')

export default React.memo(function Layout(props) {
  const searchDialog = React.useRef(null)
  const [isSearchReady, setIsSearchReady] = React.useState(false)

  return (
    <div className='Layout'>
      <Only.Desktop>
        <EyeCatcher id='patch-2020-09-2'>
          Be sure to check the small{' '}
          <Link to='/changelog/3rd-anniversary'>
            event to celebrate Stormbound’s 3rd anniversary
          </Link>
          !
        </EyeCatcher>
      </Only.Desktop>

      <Header
        active={props.active}
        isSearchReady={isSearchReady}
        openSearch={() => searchDialog.current.show()}
      />

      <main className='Layout__body'>
        <motion.div
          key='layout'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.8 }}
        >
          {props.children}
        </motion.div>
      </main>

      <Footer />

      <SearchDialog
        dialogRef={searchDialog}
        setIsSearchReady={setIsSearchReady}
      />
    </div>
  )
})
