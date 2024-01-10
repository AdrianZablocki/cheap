'use client'

import { useState } from 'react'

import filtersIcon from '@/public/icons/filters.svg'
import Filters from '@/components/filters'
import FiltersChips from '@/components/filters-chips'
import IconButton from '../../UI/icon-button'
import SearchBar from '../../UI/searchbar'
import Modal from '../modal'

import styles from './navbar.module.scss'

const Navbar = ({ setKeyword, handlePageClick, setFilters, filters }) => {
  const [showModal, setShowModal] = useState(false)

  const isFilters = () => {
    return filters.region || filters.strainName
  }
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>

        <SearchBar setKeyword={setKeyword} handlePageClick={handlePageClick} />

        <div className={styles.actionButtons}>
          <IconButton
            width={40}
            height={40}
            icon={filtersIcon}
            alt="search"
            action={() => setShowModal(true)}
          />
        </div>

        {showModal &&
          <Modal onClose={() => setShowModal(false)}>
            <Filters setFilters={setFilters} closeModal={() => setShowModal(false)} filters={filters} />
          </Modal>
        }
      </div>

      {isFilters() && <FiltersChips filters={filters} setFilters={setFilters} />}
    </div>
  )
}

export default Navbar
